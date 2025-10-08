import { User } from "@rei-init/micro-domain";
import { User as SupabaseUser } from '@supabase/supabase-js';

export interface ENV {
    // Cloudflare Bindings
    REI_CAST_XYZ_D1: D1Database;
    REI_CAST_XYZ_KV: KVNamespace;
    REI_CAST_XYZ_R2: R2Bucket;
    ASSETS: Fetcher;
    
    // Environment Variables / Secrets
    SUPABASE_AUTH_SERVICE_ROLE_KEY?: string;
    SUPABASE_URL?: string;
    SUPABASE_ANON_KEY?: string;
}

// Auth context for authenticated routes
export type AuthContext = {
    Variables: {
        user: User;          // Internal user from our database
        supabaseUser: SupabaseUser;  // Supabase user from JWT
    }
}