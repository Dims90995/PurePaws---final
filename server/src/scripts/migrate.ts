import { readFile } from 'fs/promises';
import path from 'path';
import { pool } from '../db';

async function migrate() {
  const sqlPath = path.resolve(__dirname, '../../db-migrations/001-init.sql');
  const sql = await readFile(sqlPath, 'utf8');
  await pool.query(sql);
  console.log('✅ Migration complete');
  process.exit();
}

migrate().catch((err) => {
  console.error('❌ Migration failed', err);
  process.exit(1);
});