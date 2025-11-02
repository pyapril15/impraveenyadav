// types/festival.ts
// -----------------
// Type definitions for festivals, religious festivals, and upcoming events

/* ------------------------- Festival Item ------------------------- */
export interface FestivalItem {
  /** Day of the month as string (e.g., "15") */
  date: string;

  /** Day of the week (e.g., "Monday") */
  day: string;

  /** Festival name */
  name: string;

  /** Optional month name (e.g., "January") */
  month?: string;
}

/* ---------------------- Regular Festivals Response ---------------------- */
export interface FestivalsResponse {
  /** Year of the festivals */
  year: number;

  /** Optional month number (1-12) */
  month?: number;

  /** Map of month names to list of festivals */
  festivals: Record<string, FestivalItem[]>;
}

/* -------------------- Religious Festivals Response -------------------- */
export interface ReligiousFestivalsResponse {
  /** Year of the festivals */
  year: number;

  /** Optional month number (1-12) */
  month?: number;

  /** Map of month names to list of religious festivals */
  religious_festivals: Record<string, FestivalItem[]>;
}

/* --------------------------- Health Check Response --------------------------- */
export interface HealthResponse {
  /** Status string (e.g., "ok") */
  status: string;

  /** Timestamp of response */
  timestamp: string;

  /** API version */
  version: string;
}

/* ------------------------- Upcoming Festival ------------------------- */
export interface UpcomingFestival extends FestivalItem {
  /** Full Date object of the festival */
  fullDate: Date;

  /** Month name (e.g., "January") */
  monthName: string;
}
