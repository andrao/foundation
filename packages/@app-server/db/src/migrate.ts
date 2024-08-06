import { migrate } from 'drizzle-orm/neon-http/migrator';
import { getNeonServerlessClient } from './connections/neon-serverless.js';

/**
 * Run migrations on the database, skipping the ones already applied
 */
await migrate(getNeonServerlessClient('MIGRATION'), { migrationsFolder: './.drizzle' });
