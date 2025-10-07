import { Hono } from "hono";

import { SupabaseAuthSession, User, UserRepository } from "@rei-init/micro-domain";
import { ENV } from "../../env";

const AuthRouter = new Hono<{ Bindings: ENV }>();


AuthRouter.post("/supabase-sync", async (c) => {
    const session: SupabaseAuthSession = await c.req.json();
    // Handle the Supabase auth session
    const userRepository = new UserRepository(c.env.REI_CAST_XYZ_D1);

    const internal_user_record = await userRepository.findByUserEmail(session.user.email);

    if (!internal_user_record) {
        // create user record
        const now = new Date().toISOString();
        const newUser: User = {
            id: 0, // Will be auto-incremented by SQLite
            name: session.user.user_metadata.full_name || session.user.email.split('@')[0],
            username: session.user.email.split('@')[0],
            email: session.user.email,
            avatar_url: session.user.user_metadata.avatar_url || '',
            password_hash: '', // No password since using Supabase auth
            config: {},
            createdAt: now,
            updatedAt: now,
        };
        const createdUser = await userRepository.save(newUser);

        return c.json(createdUser);
    }

    return c.json(internal_user_record);
});

export default AuthRouter;  
