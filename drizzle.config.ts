import { defineConfig } from 'drizzle-kit';
export default defineConfig({
  schema: './data/dbOrm/schema/shipments.ts',
  out: './drizzle',
  dialect: 'sqlite',
  driver: 'expo',
});