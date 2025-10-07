import { verify } from 'jsonwebtoken'
import { Context, Next } from 'hono'
import { ENV, AuthContext } from '../../env'
import { UserRepository } from '@rei-init/micro-domain'

export async function authMiddleware(c: Context<{ Bindings: ENV } & AuthContext>, next: Next) {
    
    if (!c.env.SUPABASE_AUTH_SERVICE_ROLE_KEY) {
        return c.text('Supabase auth service role key missing', 500);
    }

    const auth = c.req.header('authorization');
    if (!auth?.startsWith('Bearer ')) {
        return c.text('Unauthorized', 401);
    }

    const token = auth.slice(7);

    try {
        const decoded = verify(token, c.env.SUPABASE_AUTH_SERVICE_ROLE_KEY) as any;
        
        // Get the email from the JWT payload
        const email = decoded.email;
        if (!email) {
            return c.text('Email not found in token', 400);
        }

        // Look up our internal user record
        const userRepo = new UserRepository(c.env.REI_CAST_XYZ_D1);
        const internalUser = await userRepo.findByUserEmail(email);
        
        if (!internalUser) {
            return c.text('User not found in internal database', 404);
        }

        // Attach both users to context for downstream handlers
        c.set("user", internalUser);
        c.set("supabaseUser", decoded);

        await next();
    } catch (err) {
        return c.text('Invalid or expired token', 401);
    }
}