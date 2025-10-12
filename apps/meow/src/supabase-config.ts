// Supabase configuration - will be passed as props from server-side
export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

// Default fallback values (for development)
export const defaultSupabaseConfig: SupabaseConfig = {
  url: 'https://pnlhagzgdvquioqyxggs.supabase.co',
  anonKey: 'sb_publishable_lt7_lAielqBkFbLCgQhqOA_u9ASI_pB'
};

// Helper function to create credentials array from config
export const createSupabaseCredentials = (config: SupabaseConfig) => 
  [config.url, config.anonKey] as const;