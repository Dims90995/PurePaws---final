import express from 'express';
import { createAd, getAdsByCategory, updateAd, getAdById } from '../controllers/adsController';

const router = express.Router();

router.post('/', createAd);
router.get('/category/:categoryId', getAdsByCategory);
router.put('/:id', updateAd);
router.get('/:id', getAdById);

export default router;