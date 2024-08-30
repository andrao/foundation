CREATE TABLE `entry` (
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	`entry_id` varchar(36) NOT NULL,
	`project_id` varchar(36) NOT NULL,
	`status` enum('unprocessed','processed') NOT NULL DEFAULT 'unprocessed',
	`org_id` varchar(36),
	`user_id` varchar(36),
	CONSTRAINT `entry_entry_id` PRIMARY KEY(`entry_id`)
);
--> statement-breakpoint
CREATE TABLE `project` (
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`deleted_at` timestamp,
	`project_id` varchar(36) NOT NULL,
	`name` varchar(255) NOT NULL,
	`org_id` varchar(36),
	`user_id` varchar(36),
	CONSTRAINT `project_project_id` PRIMARY KEY(`project_id`)
);
--> statement-breakpoint
CREATE INDEX `idx_org_id` ON `entry` (`org_id`);--> statement-breakpoint
CREATE INDEX `idx_user_id` ON `entry` (`user_id`);--> statement-breakpoint
CREATE INDEX `idx_project_id` ON `entry` (`project_id`);