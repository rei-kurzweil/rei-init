CREATE TABLE `items` (
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
	`createdAt` text DEFAULT (strftime('%s','now')) NOT NULL,
	FOREIGN KEY (`from_user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `items_content_kv_key_unique` ON `items` (`content_kv_key`);--> statement-breakpoint
CREATE TABLE `users` (
	`id` integer PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`username` text NOT NULL,
	`password_hash` text NOT NULL,
	`name` text NOT NULL,
	`config` text DEFAULT '{}' NOT NULL,
	`createdAt` integer DEFAULT (strftime('%s','now')) NOT NULL,
	`updatedAt` integer DEFAULT (strftime('%s','now')) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);--> statement-breakpoint
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);