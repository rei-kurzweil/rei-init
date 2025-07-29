import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";


export const users = sqliteTable('users', {
    id: integer().primaryKey(),

    email:    text().notNull().unique(),
    username: text().notNull().unique(),
    
    name:     text().notNull(),
    password: text().notNull(),

    config:   text().notNull().default('{}'),

    created_at: integer().notNull().default(sql`(strftime('%s','now'))`),
    updated_at: integer().notNull().default(sql`(strftime('%s','now'))`),
});

export const items = sqliteTable('items', {
    id: integer().primaryKey(),

    // authorship:
    from_user_id: integer().notNull()
                            .references(() => users.id, { onDelete: 'cascade' }),
    // replying to people or things:
    to_user_id:   integer().references(() => users.id),
    to_item_id:   integer().references(() => items.id),

    content:        text().notNull().default("{}"),
    content_type:   text().notNull().default("application/json"),
    content_kv_key: text().unique(),

    matrix:         text().notNull()
                        .default("[1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]"),

    x: real().notNull().default(0),
    y: real().notNull().default(0),
    z: real().notNull().default(0),

    created_at: integer().notNull().default(sql`(strftime('%s','now'))`),
    updated_at: integer().notNull().default(sql`(strftime('%s','now'))`),
});


