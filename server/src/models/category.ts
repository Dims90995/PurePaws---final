import { CategoryField } from './categoryField';
export interface Category {
  id: string;
  name: string;
  type: 'pet' | 'car' | 'realestate' | 'general';
  color: string;
  location: string;
  fields: CategoryField[];
}