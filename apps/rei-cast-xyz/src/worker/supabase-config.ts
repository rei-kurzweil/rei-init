import type { Context } from 'hono';
import type { Env } from 'hono';
import { ENV } from './env';

/**
 * Creates supabase config object for client-side islands from server environment
 */
export function getSupabaseConfigForClient(c: Context<Env & { Bindings: ENV }>) {
    return {
        url: c.env.SUPABASE_URL,
        anonKey: c.env.SUPABASE_ANON_KEY
    };
}

/**
 * Serializes supabase config for use in template literals within script tags
 * Only includes defined values to allow MeowApp fallbacks to work
 */
export function serializeSupabaseConfig(c: Context<Env & { Bindings: ENV }>) {
    const config = getSupabaseConfigForClient(c);
    const props: string[] = [];
    
    if (config.url) {
        props.push(`url: '${config.url}'`);
    }
    
    if (config.anonKey) {
        props.push(`anonKey: '${config.anonKey}'`);
    }
    
    return `{
        ${props.join(',\n        ')}
    }`;
}