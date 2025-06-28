import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { pool } from './db';

pool
  .connect()
  .then(() => {
    console.log('✅ Connected to Postgres');

    app.locals.pool = pool;

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 Server is listening on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Postgres connection error:', err);
    process.exit(1);
  });