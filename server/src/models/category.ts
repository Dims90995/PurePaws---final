export interface Category {
  id: string;
  name: string;
  type: 'pet' | 'car' | 'realestate' | 'general';
  color: string;
  schema: Record<string, any>;
}