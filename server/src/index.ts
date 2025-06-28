import dotenv from 'dotenv';
import { Pool } from 'pg';
import app from './app';

dotenv.config();


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }  
});


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

  