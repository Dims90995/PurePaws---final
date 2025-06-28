import { readFile } from 'fs/promises';
import { pool } from '../src/db';

async function migrate() {
  const sql = await readFile('server/db-migrations/create_tables.sql', 'utf8');
  await pool.query(sql);
  console.log('✅ Migration complete');
  process.exit();
}

migrate().catch((err) => {
  console.error('❌ Migration failed', err);
  process.exit(1);
});