PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_items` (
	`id` integer PRIMARY KEY NOT NULL,
	`from_user_id` integer NOT NULL,
	`to_user_ids` text DEFAULT '[]' NOT NULL,
	`to_item_ids` text DEFAULT '[]' NOT NULL,
	`content` text DEFAULT '{}' NOT NULL,
	`content_type` text DEFAULT 'application/json' NOT NULL,
	`content_kv_key` text,
	`matrix` text DEFAULT '[1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]' NOT NULL,
	`x` real DEFAULT 0 NOT NULL,
	`y` real DEFAULT 0 NOT NULL,
	`z` real DEFAULT 0 NOT NULL,
	`createdAt` text DEFAULT (datetime('now','utc') || 'Z') NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_items`("id", "from_user_id", "to_user_ids", "to_item_ids", "content", "content_type", "content_kv_key", "matrix", "x", "y", "z", "createdAt") SELECT "id", "from_user_id", "to_user_ids", "to_item_ids", "content", "content_type", "content_kv_key", "matrix", "x", "y", "z", "createdAt" FROM `items`;--> statement-breakpoint
DROP TABLE `items`;--> statement-breakpoint
ALTER TABLE `__new_items` RENAME TO `items`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
CREATE UNIQUE INDEX `items_content_kv_key_unique` ON `items` (`content_kv_key`);--> statement-breakpoint
CREATE TABLE `__new_users` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`username` text NOT NULL,
	`password_hash` text NOT NULL,
	`name` text NOT NULL,
	`avatar_url` text,
	`config` text DEFAULT '{}' NOT NULL,
	`createdAt` text DEFAULT (datetime('now','utc') || 'Z') NOT NULL,
	`updatedAt` text DEFAULT (datetime('now','utc') || 'Z') NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_users`("id", "email", "username", "password_hash", "name", "avatar_url", "config", "createdAt", "updatedAt") SELECT "id", "email", "username", "password_hash", "name", NULL, "config", "createdAt", "updatedAt" FROM `users`;--> statement-breakpoint
DROP TABLE `users`;--> statement-breakpoint
ALTER TABLE `__new_users` RENAME TO `users`;--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);