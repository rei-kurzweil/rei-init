import { sqliteTable, integer, text, real } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";


export const usersTable = sqliteTable('users', {
    id: integer().primaryKey(),

    email:         text().notNull().unique(),
    username:      text().notNull().unique(),
    password_hash: text().notNull(),

    name:          text().notNull(),
    config:        text().notNull().default('{}'),

    createdAt: integer().notNull().default(sql`(strftime('%s','now'))`),
    updatedAt: integer().notNull().default(sql`(strftime('%s','now'))`),
});

let itemsRef: any;

export const itemsTable = sqliteTable('items', {
    id: integer().primaryKey(),

    from_user_id: integer().notNull()
        .references(() => usersTable.id, { onDelete: 'cascade' }),

    to_user_ids: text().notNull().default("[]"), // JSON array of user IDs
    to_item_ids: text().notNull().default("[]"), // JSON array of item IDs

    content: text().notNull().default("{}"),
    content_type: text().notNull().default("application/json"),
    content_kv_key: text().unique(),

    matrix: text().notNull()
        .default("[1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]"),

    x: real().notNull().default(0),
    y: real().notNull().default(0),
    z: real().notNull().default(0),

    createdAt: text().notNull().default(sql`(strftime('%s','now'))`),
});

itemsRef = itemsTable;