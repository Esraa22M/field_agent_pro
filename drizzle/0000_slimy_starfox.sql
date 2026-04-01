CREATE TABLE `shipments` (
	`order_id` integer PRIMARY KEY NOT NULL,
	`status` text,
	`customer_name` text,
	`client_company` text,
	`delivery_address` text,
	`delivery_date` text,
	`end_time` text DEFAULT '',
	`task_type` text,
	`latitude` real,
	`longitude` real,
	`notes` text DEFAULT '',
	`contact_phone` text DEFAULT ''
);
