import { Product } from './product';
import { ProductCategory } from './productCategory';

export interface ProductSelectedCategory {
  id: number;
  deleted: boolean;
  createDate: Date;
  lastUpdateDate: Date;
  productId: number;
  productCategoryId: number;
  product: Product;
  productCategory: ProductCategory;
}
