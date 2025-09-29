import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/d1';

// external package dependency
// import { usersTable } from '@rei-init/micro-domain/db/schema';

// local package imports
import type { ENV } from '../env';

// monorepo package imports
import { usersTable } from '@rei-init/micro-domain/db/schema';

//


// Create Hono app with generic type for environment bindings
const app = new Hono<{ Bindings: ENV }>();


// Route to get all users
app.get('/', async (c) => {
    const db = drizzle(c.env.REI_CAST_XYZ_D1);

    const allUsers = await db.select().from(usersTable as any).all();
    return c.json(allUsers);
});


// Export the app as the default export for Cloudflare Workers
export default app;