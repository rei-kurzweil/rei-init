import { createClient } from '@supabase/supabase-js'
import { Context, Next } from 'hono'
import { ENV, AuthContext } from '../../env'
import { UserRepository } from '@rei-init/micro-domain'

export async function authMiddleware(c: Context<{ Bindings: ENV } & AuthContext>, next: Next) {
    
    if (!c.env.SUPABASE_URL || !c.env.SUPABASE_AUTH_SERVICE_ROLE_KEY) {
        return c.json({ error: "Supabase configuration missing" }, 500);
    }

    const supabaseClient = createClient(c.env.SUPABASE_URL, c.env.SUPABASE_AUTH_SERVICE_ROLE_KEY);

    const authHeader = c.req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return c.json({ error: "Missing or invalid Authorization header" }, 401);
    }

    const token = authHeader.substring(7); // Remove "Bearer " prefix

    const { data: { user: supabaseUser }, error } = await supabaseClient.auth.getUser(token);

    if (error || !supabaseUser) {
        return c.json({ error: "Invalid token or user not found" }, 401);
    }

    if (!supabaseUser.email) {
        return c.json({ error: "User email not found" }, 400);
    }

    // Look up our internal user record
    const userRepo = new UserRepository(c.env.REI_CAST_XYZ_D1);
    const internalUser = await userRepo.findByUserEmail(supabaseUser.email);
    
    if (!internalUser) {
        return c.json({ error: "User not found in internal database" }, 404);
    }

    // Attach both users to context for downstream handlers
    c.set("user", internalUser);
    c.set("supabaseUser", supabaseUser);

    await next();
}