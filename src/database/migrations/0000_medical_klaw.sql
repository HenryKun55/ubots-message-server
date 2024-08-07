CREATE TABLE `messages` (
	`id` text PRIMARY KEY NOT NULL,
	`text` text NOT NULL,
	`sender_id` text NOT NULL,
	`receiver_id` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
