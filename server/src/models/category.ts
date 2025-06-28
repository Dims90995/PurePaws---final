import { CategoryField } from './CategoryField';
export interface Category {
  id: string;
  name: string;
  type: 'pet' | 'car' | 'realestate' | 'general';
  color: string;
  fields: CategoryField[];
}