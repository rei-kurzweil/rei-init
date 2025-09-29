import { Hono } from 'hono';
import { drizzle } from 'drizzle-orm/d1';
import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

import type { ENV } from '../env';

// Define the users table
const users = sqliteTable('users', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
});


// Create Hono app with generic type for environment bindings
const app = new Hono<{ Bindings: ENV }>();

// Route to create the users table if it doesn't exist
app.get('/setup', async (c) => {
    const db = drizzle(c.env.REI_CAST_XYZ_D1);

    await db.run(sql`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL
    )
  `);

    return c.text('Table created or already exists!');
});

// Route to add a test user
app.get('/add', async (c) => {
    const db = drizzle(c.env.REI_CAST_XYZ_D1);

    const newUser = await db.insert(users)
        .values({ name: 'Test User' })
        .returning()
        .get();

    return c.json(newUser);
});

// Route to get all users
app.get('/users', async (c) => {
    const db = drizzle(c.env.REI_CAST_XYZ_D1);

    const allUsers = await db.select().from(users).all();
    return c.json(allUsers);
});

// Default route
app.get('/', (c) => {
    return c.text('D1 Connected!');
});

// Export the app as the default export for Cloudflare Workers
export default app;