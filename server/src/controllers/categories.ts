import { Request, Response } from 'express';
import { pool } from '../db';
import { Category } from '../models/category';

export async function getAllCategories(req: Request, res: Response) {
  try {
    const result = await pool.query('SELECT * FROM categories');
    const categories = result.rows.map((row) => ({
      ...row,
      fields: row.schema
    }));
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
}

export async function getCategoryById(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const result = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
    if (result.rowCount === 0) return res.status(404).json({ error: 'Category not found' });

    const category = result.rows[0];
    res.json({ ...category, fields: category.schema });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch category' });
  }
}

export async function createCategory(req: Request, res: Response) {
  const { name, type, color, location, fields } = req.body as Partial<Category>;

  if (!name || typeof name !== 'string') return res.status(400).json({ error: 'Invalid name' });
  if (!['pet', 'car', 'realestate', 'general'].includes(type || '')) return res.status(400).json({ error: 'Invalid type' });
  if (!color || typeof color !== 'string') return res.status(400).json({ error: 'Invalid color' });
  if (!location || typeof location !== 'string') return res.status(400).json({ error: 'Invalid location' });
  if (!fields || !Array.isArray(fields)) return res.status(400).json({ error: 'Invalid fields' });

  const id = crypto.randomUUID().slice(0, 10);
  const category: Category = { id, name, type: type as any, color, location, fields };

  try {
    const result = await pool.query(
      'INSERT INTO categories (id, name, type, color, location, schema) VALUES ($1, $2, $3, $4, $5, $6) RETURNING created_at, updated_at',
      [category.id, category.name, category.type, category.color, category.location, JSON.stringify(category.fields)]
    );
    const { created_at, updated_at } = result.rows[0];
    res.status(201).json({ ...category, created_at, updated_at });
  } catch (error) {
    res.status(500).json({ error: 'Failed to insert category' });
  }
}