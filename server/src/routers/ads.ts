import express from 'express';
import { createAd, getAdsByCategory } from '../controllers/adsController';

const router = express.Router();

router.post('/', createAd);
router.get('/category/:categoryId', getAdsByCategory);

export default router;