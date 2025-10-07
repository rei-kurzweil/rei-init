import { Hono } from "hono";
import { ENV, AuthContext } from "../../env";
import { authMiddleware } from "./auth-middleware";

const UserRouter = new Hono<{ Bindings: ENV } & AuthContext>();

// Protected route - get current user info
UserRouter.get("/me", authMiddleware, async (c) => {
    const user = c.get("user"); // Internal user from auth middleware
    const supabaseUser = c.get("supabaseUser"); // Supabase user from auth middleware
    
    return c.json({ 
        user,
        supabase_user: supabaseUser 
    });
});

export default UserRouter;