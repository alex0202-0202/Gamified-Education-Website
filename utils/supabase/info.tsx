// Public Supabase browser config. The anon key is not a service secret, but it
// must be paired with strict Row Level Security policies before school launch.

export const projectId = import.meta.env.VITE_SUPABASE_PROJECT_ID ?? "";
export const publicAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY ?? "";
