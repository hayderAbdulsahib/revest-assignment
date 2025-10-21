export interface UpdateProductRequest {
  id: string;
  payload?: UpdateProductPayload;
}

export interface UpdateProductPayload {
  name?: string;
  price?: number;
  isActive?: boolean;
}
