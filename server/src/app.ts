import express, { Request, Response } from 'express';
import cors from 'cors';
import { Pool } from 'pg';

const app = express();
app.use(cors());
app.use(express.json());


app.get('/api', (_req: Request, res: Response) => {
  res.json({ message: 'Server is running!' });
});


app.get('/api/pets', async (req: Request, res: Response) => {
  const pool: Pool = req.app.locals.pool;
  try {
    const { rows } = await pool.query('SELECT * FROM pets;');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});

app.post('/api/pets', async (req: Request, res: Response) => {
  const pool: Pool = req.app.locals.pool;
  const { name, species } = req.body;
  if (!name || !species) {
    return res.status(400).json({ error: 'name and species are required' });
  }

  try {
    const { rows } = await pool.query(
      'INSERT INTO pets(name, species) VALUES($1, $2) RETURNING *;',
      [name, species]
    );
    res.status(201).json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'DB error' });
  }
});


app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' });
});

export default app;
