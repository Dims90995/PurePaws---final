import { pool } from '../db';
import { allCategories } from '../models/categories';

async function seedCategories() {
  for (const cat of allCategories) {
    await pool.query(
      `INSERT INTO categories (id, name, type, color, schema)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (id) DO UPDATE SET
         name = EXCLUDED.name,
         type = EXCLUDED.type,
         color = EXCLUDED.color,
         schema = EXCLUDED.schema`,
      [cat.id, cat.name, cat.type, cat.color, JSON.stringify(cat.fields)]
    );
  }
  console.log('✅ Categories seeded or updated');
  process.exit();
}

seedCategories().catch((err) => {
  console.error('❌ Failed to seed categories', err);
  process.exit(1);
});
