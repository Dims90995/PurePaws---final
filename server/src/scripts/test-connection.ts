import { pool } from '../db';

console.log('🧪 ENV DEBUG:', {
  PG_USER: process.env.PG_USER,
  PG_HOST: process.env.PG_HOST,
  PG_DATABASE: process.env.PG_DATABASE,
  PG_PASSWORD: process.env.PG_PASSWORD,
  PG_PORT: process.env.PG_PORT,
  PG_SSL: process.env.PG_SSL,
});

pool.query('SELECT NOW()')
  .then(res => {
    console.log('✅ Connected at:', res.rows[0]);
    process.exit();
  })
  .catch(err => {
    console.error('❌ Connection error:', err);
    process.exit(1);
  });