DROP INDEX `idx_org_id` ON `entry`;--> statement-breakpoint
DROP INDEX `idx_user_id` ON `entry`;--> statement-breakpoint
ALTER TABLE `entry` DROP COLUMN `org_id`;--> statement-breakpoint
ALTER TABLE `entry` DROP COLUMN `user_id`;