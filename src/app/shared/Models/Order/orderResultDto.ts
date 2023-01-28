import { OrderLineResultDto } from './orderLineResultDto';

export interface OrderResultDto {
  orderId: number;
  paymentDate: Date;
  isPaid: boolean;
  orderLines: OrderLineResultDto[];
}
