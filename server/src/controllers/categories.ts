import { Request, Response } from 'express';
import { pool } from '../db';
import { Category } from '../models/category';

export async function getAllCategories(req: Request, res: Response) {
  try {
    const result = await pool.query('SELECT * FROM categories');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
}

export async function createCategory(req: Request, res: Response) {
  const { id, name, type, color, schema } = req.body as Partial<Category>;

  if (!id || typeof id !== 'string') return res.status(400).json({ error: 'Invalid id' });
  if (!name || typeof name !== 'string') return res.status(400).json({ error: 'Invalid name' });
  if (!['pet', 'car', 'realestate', 'general'].includes(type || '')) return res.status(400).json({ error: 'Invalid type' });
  if (!color || typeof color !== 'string') return res.status(400).json({ error: 'Invalid color' });
  if (!schema || typeof schema !== 'object') return res.status(400).json({ error: 'Invalid schema' });

  const category: Category = { id, name, type: type as any, color, schema };

  try {
    await pool.query(
      'INSERT INTO categories (id, name, type, color, schema) VALUES ($1, $2, $3, $4, $5)',
      [category.id, category.name, category.type, category.color, category.schema]
    );
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ error: 'Failed to insert category' });
  }
}