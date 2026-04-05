import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';
export const shipments = sqliteTable('shipments', {
  order_id: integer('order_id').primaryKey(),
  status: text('status'),
  customer_name: text('customer_name'),
  client_company: text('client_company'),
  delivery_address: text('delivery_address'),
  delivery_date: text('delivery_date'),
  end_time: text('end_time').default(''),
  task_type: text('task_type'),
  latitude: real('latitude'),
  longitude: real('longitude'),
  notes: text('notes').default(''),
  contact_phone: text('contact_phone').default(''),
  is_deleted: integer('is_deleted').default(0),});