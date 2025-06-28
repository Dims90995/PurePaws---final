import { Category } from '../models/category';
import { v4 as uuidv4 } from 'uuid';

export const petCategory: Category = {
  id: uuidv4(),
  name: 'חיות',
  type: 'pet',
  color: '#FFB6C1',
  fields: [
    { name: 'title', type: 'string', required: true },
    { name: 'price', type: 'number', required: true },
    { name: 'description', type: 'string', required: true },
    { name: 'breed', type: 'string', required: true },
    { name: 'age', type: 'number', required: false },
    { name: 'gender', type: 'string', required: false },
  ]
};

export const allCategories: Category[] = [petCategory];