import { ProductGallery } from './prodcutGallery';
import { ProductSelectedCategory } from './ProductSelectedCategory';
import { ProductVisit } from './productVisit';

export interface Product {
  id: number;
  deleted: boolean;
  createDate: Date;
  lastUpdateDate: Date;
  name: string;
  description: string;
  shortDescription: string;
  imageUrl: string;
  existed: boolean;
  price: number;
  specialProduct: boolean;
}
