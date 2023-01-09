export interface ProductVisit {
  id: number;
  deleted: boolean;
  createDate: Date;
  lastUpdateDate: Date;
  productId: number;
  visitorIp: string;
}
