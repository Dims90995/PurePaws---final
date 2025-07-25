import { Router } from 'express';
import { getAllCategories, getCategoryById, createCategory } from '../controllers/categories';

const router = Router();

router.get('/', getAllCategories);           
router.get('/:id', getCategoryById);         
router.post('/', createCategory);           

export default router;