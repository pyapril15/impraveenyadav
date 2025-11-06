// Location: src/lib/redis.ts

const EDGE_FUNCTION_URL =
  "https://cwondevcvfikoasscjyy.supabase.co/functions/v1/redis-cache";

const DEFAULT_TIMEOUT = 3000;
const MAX_RETRIES = 3;
const BACKOFF_BASE = 200;
const CIRCUIT_BREAKER_THRESHOLD = 5;
const CIRCUIT_BREAKER_RESET = 10000;

type RedisResponse<T> = { success?: boolean; data?: T };

// ⏱ Sleep helper
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// 🌐 Fetch with timeout
function fetchWithTimeout(
  url: string,
  options: RequestInit,
  timeout = DEFAULT_TIMEOUT
): Promise<Response> {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error("Request timed out")),
      timeout
    );
    fetch(url, options)
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

class RedisCache {
  private consecutiveFailures = 0;
  private circuitOpenUntil: number | null = null;
  private backgroundCache: Map<string, unknown> = new Map();
  private refreshingKeys: Set<string> = new Set();

  private isCircuitOpen(): boolean {
    return this.circuitOpenUntil !== null && Date.now() < this.circuitOpenUntil;
  }

  // 🚀 Core request handler
  private async request<T>(
    payload: Record<string, unknown>
  ): Promise<T | null> {
    if (this.isCircuitOpen()) {
      console.warn(
        "Redis circuit breaker is open. Returning null immediately."
      );
      return null;
    }

    let lastError: unknown = null;

    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        const res = await fetchWithTimeout(EDGE_FUNCTION_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) throw new Error(`Redis request failed: ${res.statusText}`);

        const json: RedisResponse<T> = await res.json();
        this.consecutiveFailures = 0;
        return json?.data ?? null;
      } catch (err) {
        lastError = err;
        this.consecutiveFailures++;

        if (this.consecutiveFailures >= CIRCUIT_BREAKER_THRESHOLD) {
          this.circuitOpenUntil = Date.now() + CIRCUIT_BREAKER_RESET;
          console.error(
            "Redis circuit breaker opened due to repeated failures."
          );
          return null;
        }

        const backoff = BACKOFF_BASE * Math.pow(2, attempt);
        console.warn(
          `Redis request attempt ${
            attempt + 1
          } failed, retrying in ${backoff}ms`,
          err
        );
        await sleep(backoff);
      }
    }

    console.error("Redis request failed after all retries:", lastError);
    return null;
  }

  private validateKey(key: string): void {
    if (!key || typeof key !== "string") throw new Error("Invalid Redis key");
  }

  private validateKeys(keys: string[]): void {
    if (!Array.isArray(keys) || keys.some((k) => !k || typeof k !== "string")) {
      throw new Error("Invalid Redis keys array");
    }
  }

  // ♻️ Background refresh for stale cache
  private async refreshKey<T>(key: string, ttlSeconds?: number): Promise<void> {
    if (this.refreshingKeys.has(key)) return;
    this.refreshingKeys.add(key);

    try {
      const freshData = await this.getRemote<T>(key);
      if (freshData !== null) {
        this.backgroundCache.set(key, freshData);
        if (ttlSeconds) {
          setTimeout(() => this.backgroundCache.delete(key), ttlSeconds * 1000);
        }
      }
    } finally {
      this.refreshingKeys.delete(key);
    }
  }

  // ☁️ Direct remote fetch
  private async getRemote<T>(key: string): Promise<T | null> {
    return this.request<T>({ operation: "get", key });
  }

  // 💾 Public get with stale-while-revalidate
  async get<T>(key: string, ttlSeconds?: number): Promise<T | null> {
    this.validateKey(key);

    if (this.backgroundCache.has(key)) {
      const cached = this.backgroundCache.get(key) as T;
      this.refreshKey<T>(key, ttlSeconds);
      return cached;
    }

    const data = await this.getRemote<T>(key);
    if (data !== null) {
      this.backgroundCache.set(key, data);
      if (ttlSeconds) {
        setTimeout(() => this.backgroundCache.delete(key), ttlSeconds * 1000);
      }
    }
    return data;
  }

  // 🧠 Set key-value
  async set<T>(key: string, value: T, ttlSeconds?: number): Promise<boolean> {
    this.validateKey(key);
    const result = await this.request<{ success: boolean }>({
      operation: "set",
      key,
      value,
      ttl: ttlSeconds,
    });
    if (result?.success) this.backgroundCache.set(key, value);
    return result?.success ?? false;
  }

  // ❌ Delete key
  async del(key: string): Promise<boolean> {
    this.validateKey(key);
    const result = await this.request<{ success: boolean }>({
      operation: "del",
      key,
    });
    if (result?.success) this.backgroundCache.delete(key);
    return result?.success ?? false;
  }

  // 📚 Batch get
  async mget<T>(keys: string[], ttlSeconds?: number): Promise<(T | null)[]> {
    this.validateKeys(keys);
    const results = await Promise.all(
      keys.map((key) => this.get<T>(key, ttlSeconds))
    );
    return results;
  }

  // 🧩 Batch set
  async mset<T>(
    entries: Record<string, T>,
    ttlSeconds?: number
  ): Promise<boolean> {
    const keys = Object.keys(entries);
    this.validateKeys(keys);
    const result = await this.request<{ success: boolean }>({
      operation: "mset",
      entries,
      ttl: ttlSeconds,
    });
    if (result?.success) {
      Object.entries(entries).forEach(([k, v]) =>
        this.backgroundCache.set(k, v)
      );
    }
    return result?.success ?? false;
  }

  // 🗑 Batch delete
  async mdel(keys: string[]): Promise<boolean> {
    this.validateKeys(keys);
    const result = await this.request<{ success: boolean }>({
      operation: "mdel",
      keys,
    });
    if (result?.success) keys.forEach((k) => this.backgroundCache.delete(k));
    return result?.success ?? false;
  }
}

export const redis = new RedisCache();
