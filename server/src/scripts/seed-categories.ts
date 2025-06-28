import { pool } from '../db';
import { getAllCategories } from '../models/categories';

export async function seedCategories() {
  const categories = await getAllCategories();

  for (const category of categories) {
    await pool.query(
      `INSERT INTO categories (id, name, type, color, location, schema)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (id) DO NOTHING`,
      [
        category.id,
        category.name,
        category.type,
        category.color,
        category.location ?? null, 
        JSON.stringify(category.fields)
      ]
    );
  }
}

seedCategories()
  .then(() => {
    console.log('✅ Categories seeded');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Failed to seed categories', err);
    process.exit(1);
  });