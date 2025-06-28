import { Request, Response } from 'express';
import { pool } from '../db';

export const createAd = async (req: Request, res: Response) => {
  const { title, price, description, categoryId, location, dynamicFields } = req.body;

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
    const result = await pool.query(
      `INSERT INTO ads (id, title, price, description, category_id, location, dynamic_fields)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING id, title, price, description, category_id, location, dynamic_fields, created_at, updated_at`,
      [id, title, price, description, categoryId, location, JSON.stringify(dynamicFields)]
    );
    res.status(201).json(result.rows[0]);
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
      `SELECT id, title, price, description, location, dynamic_fields, created_at, updated_at FROM ads WHERE category_id = $1`,
      [categoryId]
    );
    res.status(200).json({ ads: result.rows, expectedFields: category.schema });
  } catch (err) {
    console.error('Failed to fetch ads:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const updateAd = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, price, description, location, dynamicFields } = req.body;

  try {
    const adResult = await pool.query('SELECT * FROM ads WHERE id = $1', [id]);
    if (adResult.rowCount === 0) {
      return res.status(404).json({ error: 'Ad not found' });
    }

    const ad = adResult.rows[0];

    const categoryResult = await pool.query('SELECT * FROM categories WHERE id = $1', [ad.category_id]);
    const category = categoryResult.rows[0];
    const fields = category.schema;

    const combinedFields = {
      title: title ?? ad.title,
      price: price ?? ad.price,
      description: description ?? ad.description,
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

    const updated = await pool.query(
      `UPDATE ads SET title = $1, price = $2, description = $3, location = $4, dynamic_fields = $5
       WHERE id = $6
       RETURNING id, title, price, description, location, dynamic_fields, created_at, updated_at`,
      [
        title ?? ad.title,
        price ?? ad.price,
        description ?? ad.description,
        location ?? ad.location,
        JSON.stringify(dynamicFields ?? ad.dynamic_fields),
        id
      ]
    );

    res.status(200).json(updated.rows[0]);
  } catch (err) {
    console.error('Failed to update ad:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getAdById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      `SELECT id, title, price, description, location, dynamic_fields, created_at, updated_at FROM ads WHERE id = $1`,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Ad not found' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Failed to fetch ad:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};
