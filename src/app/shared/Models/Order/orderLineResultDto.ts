import { Product } from "../Products/product";

export interface OrderLineResultDto {
  productId: number;
  orderQty: number;
  price: number;
  product: Product
}
