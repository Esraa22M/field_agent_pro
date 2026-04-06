import { drizzle } from 'drizzle-orm/expo-sqlite';
import * as SQLite from 'expo-sqlite';
import { shipments } from './schema/shipments';

const sqliteDb = SQLite.openDatabaseSync('app.generaldb');

sqliteDb.execSync('PRAGMA journal_mode = WAL;');

export const db = drizzle(sqliteDb, { schema: { shipments } });
