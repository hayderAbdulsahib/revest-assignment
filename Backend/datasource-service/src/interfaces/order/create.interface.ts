export interface CreateOrderRequest {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string;
  productIds: string[];
}
