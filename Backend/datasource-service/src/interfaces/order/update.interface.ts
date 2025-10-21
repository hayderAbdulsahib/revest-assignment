export interface UpdateOrderRequest {
  id: string;
  payload: UpdateOrderPayload;
}

export interface UpdateOrderPayload {
  status?: string;
  cancellationReason?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  notes?: string;
  isCanceled?: boolean;
  productIds?: string[];
}
