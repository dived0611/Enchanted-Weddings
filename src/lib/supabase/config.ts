/*
  Supabase settings come from .env.local (see .env.local.example).
  If they're missing, auth features show a "not configured yet" message
  instead of crashing, so the rest of the site keeps working.
*/
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
export const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseKey);
