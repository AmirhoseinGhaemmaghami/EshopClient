import { ProductSelectedCategory } from './ProductSelectedCategory';

export interface ProductCategory {
  id: number;
  deleted: boolean;
  createDate: Date;
  lastUpdateDate: Date;
  name: string;
  description: string;
  parentCategoryId: number;
  parentCategory: ProductCategory;
  productSelectedCategories: ProductSelectedCategory[];
}
