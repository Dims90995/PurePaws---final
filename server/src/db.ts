import { Pool } from 'pg';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

console.log('🔍 PG_HOST:', process.env.PG_HOST);
export const pool = new Pool({
  user: String(process.env.PG_USER),
  host: String(process.env.PG_HOST),
  database: String(process.env.PG_DATABASE),
  password: String(process.env.PG_PASSWORD),
  port: Number(process.env.PG_PORT),
  ssl: process.env.PG_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
});