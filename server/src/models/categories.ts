import { Category } from './category';

export async function getAllCategories(): Promise<Category[]> {
  const petCategory: Category = {
    id: crypto.randomUUID().slice(0, 10),
    name: 'חיות',
    type: 'pet',
    color: '#FFB6C1',
    location: '',
    fields: [
      { name: 'title', type: 'string', required: true },
      { name: 'price', type: 'number', required: true },
      { name: 'description', type: 'string', required: true },
      { name: 'breed', type: 'string', required: true },
      { name: 'age', type: 'number', required: false },
      { name: 'gender', type: 'string', required: false },
    ],
    createdAt: null,
    updatedAt: null
  };

  return [petCategory];
}
