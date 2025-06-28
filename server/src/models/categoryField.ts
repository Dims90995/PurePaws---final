export interface CategoryField {
  name: string;
  type: 'string' | 'number' | 'boolean' | 'date';
  required: boolean;
  location?: string;
  createdAt?: Date;
  updatedAt?: Date;
}