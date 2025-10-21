export interface ListOrdersRequest {
  queries: ListOrdersQueries;
}

export interface ListOrdersQueries {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
  status?: string;
  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;
  isCanceled?: boolean;
  createdFrom?: string;
  createdTo?: string;
  updatedFrom?: string;
  updatedTo?: string;
}
