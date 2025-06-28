import { Request, Response } from 'express';
import { pool } from '../db';

export const createAd = async (req: Request, res: Response) => {
  const { title, price, description, categoryId,location, dynamicFields } = req.body;

  if (!title || !price || !description || !categoryId || !location || !dynamicFields) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const categoryResult = await pool.query(
      'SELECT * FROM categories WHERE id = $1',
      [categoryId]
    );

    if (categoryResult.rowCount === 0) {
      return res.status(400).json({ error: 'Invalid category ID' });
    }

    const category = categoryResult.rows[0];
    const fields = category.schema;

    const combinedFields = {
      title,
      price,
      description,
      ...dynamicFields
    };

    const missingFields = fields.filter(
      (field: any) => field.required && !(field.name in combinedFields)
    );

    if (missingFields.length > 0) {
      return res.status(400).json({
        error: `Missing required dynamic fields: ${missingFields.map((f: any) => f.name).join(', ')}`,
        expectedFields: fields
      });
    }

    const id = crypto.randomUUID().slice(0, 10);
    await pool.query(
      `INSERT INTO ads (id, title, price, description, category_id,location, dynamic_fields)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [id, title, price, description, categoryId,location, JSON.stringify(dynamicFields)]
    );
    res.status(201).json({ message: 'Ad created', id });
  } catch (err) {
    console.error('Failed to create ad:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAdsByCategory = async (req: Request, res: Response) => {
  const { categoryId } = req.params;

  try {
    const categoryResult = await pool.query(
      'SELECT * FROM categories WHERE id = $1',
      [categoryId]
    );

    if (categoryResult.rowCount === 0) {
      return res.status(400).json({ error: 'Invalid category ID' });
    }

    const category = categoryResult.rows[0];

    const result = await pool.query(
      `SELECT * FROM ads WHERE category_id = $1`,
      [categoryId]
    );
    res.status(200).json({ ads: result.rows, expectedFields: category.schema });
  } catch (err) {
    console.error('Failed to fetch ads:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
