// src/types/festival.ts

/* ------------------------- Festival Item ------------------------- */
export interface FestivalItem {
  /** Day of the month as a string (e.g., "15") */
  date: string;

  /** Day of the week (e.g., "Monday") */
  day: string;

  /** Festival name (e.g., "Diwali") */
  name: string;

  /** Optional month name (e.g., "January") */
  month?: string;
}

/* ---------------------- Regular Festivals Response ---------------------- */
export interface FestivalsResponse {
  /** Year of the festivals (e.g., 2025) */
  year: number;

  /** Optional month number (1-12) for specific festivals within a month */
  month?: number;

  /** A map of month names to a list of festivals for that month */
  festivals: Record<string, FestivalItem[]>;
}

/* -------------------- Religious Festivals Response -------------------- */
export interface ReligiousFestivalsResponse {
  /** Year of the religious festivals (e.g., 2025) */
  year: number;

  /** Optional month number (1-12) for specific religious festivals within a month */
  month?: number;

  /** A map of month names to a list of religious festivals for that month */
  religious_festivals: Record<string, FestivalItem[]>;
}

/* --------------------------- Health Check Response --------------------------- */
export interface HealthResponse {
  /** Status of the API (e.g., "ok") */
  status: string;

  /** Timestamp of the health check response */
  timestamp: string;

  /** Version of the API */
  version: string;
}

/* ------------------------- Upcoming Festival ------------------------- */
export interface UpcomingFestival extends FestivalItem {
  /** Full Date object representing the festival date */
  fullDate: Date;

  /** Month name (e.g., "January") */
  monthName: string;
}
