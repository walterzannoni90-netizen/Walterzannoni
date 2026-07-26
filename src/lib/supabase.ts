import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  import.meta.env.VITE_SUPABASE_URL ?? "https://pzbjnccwaccgeefqzdrn.supabase.co";
const supabaseAnonKey =
  import.meta.env.VITE_SUPABASE_ANON_KEY ??
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6YmpuY2N3YWNjZ2VlZnF6ZHJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODUwODIxNzgsImV4cCI6MjEwMDY1ODE3OH0.qphB0Tce8rA5nyIzUenlfz4v6J6UG8lJH1-o1dSOOBE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
