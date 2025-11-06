// src/integrations/supabase/client.ts
import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

// Supabase configuration values from environment variables
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL as string;
const SUPABASE_PUBLISHABLE_KEY = import.meta.env
  .VITE_SUPABASE_PUBLISHABLE_KEY as string;

// Initialize the Supabase client with database type and authentication settings
export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      storage: localStorage, // Use localStorage for storing authentication session
      persistSession: true, // Persist user session across page reloads
      autoRefreshToken: true, // Automatically refresh token when expired
    },
  }
);
