import { Product } from './product';
import { ProductGallery } from './productGallery';

export interface ProductWithDetailsResultDto {
  productResultDto: Product;
  productGalleryResultDto: ProductGallery;
}
