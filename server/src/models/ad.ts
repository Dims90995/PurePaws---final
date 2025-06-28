export interface Ad {
  id: string;
  title: string;
  price: number;
  description: string;
  categoryId: string;
  location: string;
  dynamicFields: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}