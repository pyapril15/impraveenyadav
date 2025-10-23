import API_CONFIG from "@/config/api.config";

// ---- TYPES ----
interface Festival {
    name: string;
    date: number | string;
    day: string;
    month?: string;
}

interface ReligiousFestival extends Festival {
    religion?: string;
}

interface FestivalsResponse {
    festivals: Record<string, Festival[]>;
}

interface ReligiousFestivalsResponse {
    religious_festivals: Record<string, ReligiousFestival[]>;
}

interface ParsedFestival {
    id: string;
    name: string;
    date: string;
    day: string;
    month: string;
    type: "public" | "religious";
    religion?: string;
    source: string;
}

interface HealthCheckResult {
    status: "online" | "offline";
    data?: unknown;
    error?: string;
}

// ---- SERVICE ----
const festivalAPIService = {
    // Generic fetch with retry (strongly typed)
    fetchWithRetry: async <T>(url: string, attempts = API_CONFIG.RETRY_ATTEMPTS): Promise<T> => {
        for (let i = 0; i < attempts; i++) {
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

                const response = await fetch(url, {
                    signal: controller.signal,
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                });

                clearTimeout(timeoutId);

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                return (await response.json()) as T;
            } catch (error) {
                if (i === attempts - 1) throw error;
                await new Promise((resolve) =>
                    setTimeout(resolve, API_CONFIG.RETRY_DELAY * (i + 1))
                );
            }
        }
        throw new Error("Fetch failed after retries");
    },

    // Health check
    checkHealth: async (): Promise<HealthCheckResult> => {
        try {
            const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.HEALTH}`;
            const data = await festivalAPIService.fetchWithRetry<unknown>(url, 1);
            return { status: "online", data };
        } catch (error) {
            const err = error instanceof Error ? error : new Error(String(error));
            console.error("Health check failed:", err);
            return { status: "offline", error: err.message };
        }
    },

    // Fetch all festivals for a year
    fetchFestivalsByYear: async (year: number): Promise<FestivalsResponse | null> => {
        try {
            const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.FESTIVALS_YEAR}/${year}`;
            return await festivalAPIService.fetchWithRetry<FestivalsResponse>(url);
        } catch (error) {
            console.error("Error fetching festivals by year:", error);
            return null;
        }
    },

    // Fetch religious festivals for a year
    fetchReligiousFestivalsByYear: async (
        year: number
    ): Promise<ReligiousFestivalsResponse | null> => {
        try {
            const url = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.RELIGIOUS_FESTIVALS.replace("{year}", String(year))}`;
            return await festivalAPIService.fetchWithRetry<ReligiousFestivalsResponse>(url);
        } catch (error) {
            console.error("Error fetching religious festivals:", error);
            return null;
        }
    },

    // Fetch all festivals (current + next year)
    fetchAllFestivals: async (): Promise<ParsedFestival[] | null> => {
        const currentYear = new Date().getFullYear();
        const nextYear = currentYear + 1;

        try {
            const [currentYearData, religiousData, nextYearData] = await Promise.all([
                festivalAPIService.fetchFestivalsByYear(currentYear),
                festivalAPIService.fetchReligiousFestivalsByYear(currentYear),
                festivalAPIService.fetchFestivalsByYear(nextYear),
            ]);

            const festivals: ParsedFestival[] = [];

            if (currentYearData?.festivals) {
                festivals.push(
                    ...festivalAPIService.parseFestivals(currentYearData.festivals, currentYear)
                );
            }

            if (religiousData?.religious_festivals) {
                festivals.push(
                    ...festivalAPIService.parseReligiousFestivals(
                        religiousData.religious_festivals,
                        currentYear
                    )
                );
            }

            if (nextYearData?.festivals) {
                festivals.push(
                    ...festivalAPIService.parseFestivals(nextYearData.festivals, nextYear)
                );
            }

            return festivals;
        } catch (error) {
            console.error("Error fetching all festivals:", error);
            return null;
        }
    },

    // Parse regular festivals
    parseFestivals: (
        festivalsData: Record<string, Festival[]>,
        year: number
    ): ParsedFestival[] => {
        const parsed: ParsedFestival[] = [];

        Object.entries(festivalsData).forEach(([monthName, festivalList]) => {
            festivalList.forEach((festival) => {
                const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth() + 1;
                const date = `${year}-${String(monthIndex).padStart(2, "0")}-${String(
                    festival.date
                ).padStart(2, "0")}`;

                parsed.push({
                    id: `${festival.name.toLowerCase().replace(/\s+/g, "-")}-${date}`,
                    name: festival.name,
                    date,
                    day: festival.day,
                    month: monthName,
                    type: "public",
                    source: "indian-festivals-api",
                });
            });
        });

        return parsed;
    },

    // Parse religious festivals
    parseReligiousFestivals: (
        religiousFestivalsData: Record<string, ReligiousFestival[]>,
        year: number
    ): ParsedFestival[] => {
        const parsed: ParsedFestival[] = [];

        Object.entries(religiousFestivalsData).forEach(([religion, festivalList]) => {
            festivalList.forEach((festival) => {
                const monthName = festival.month ?? "January";
                const monthIndex = new Date(`${monthName} 1, ${year}`).getMonth() + 1;
                const date = `${year}-${String(monthIndex).padStart(2, "0")}-${String(
                    festival.date
                ).padStart(2, "0")}`;

                parsed.push({
                    id: `${festival.name.toLowerCase().replace(/\s+/g, "-")}-${date}`,
                    name: festival.name,
                    date,
                    day: festival.day,
                    month: monthName,
                    religion,
                    type: "religious",
                    source: "indian-festivals-api",
                });
            });
        });

        return parsed;
    },
};

export default festivalAPIService;
