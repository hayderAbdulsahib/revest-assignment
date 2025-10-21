import { orderApiClientV1 } from "./apiClient";

// Order service functions
export const orderService = {
  getOrders: async () => {
    const response = await orderApiClientV1.get("/order?page=1&limit=100");
    return response.data;
  },

  getOrderById: async (id) => {
    const response = await orderApiClientV1.get(`/order/${id}`);
    return response.data;
  },

  createOrder: async (orderData) => {
    const response = await orderApiClientV1.post("/order", orderData);
    return response.data;
  },

  updateOrder: async (id, orderData) => {
    const response = await orderApiClientV1.put(`/order/${id}`, orderData);
    return response.data;
  },

  deleteOrder: async (id) => {
    const response = await orderApiClientV1.delete(`/order/${id}`);
    return response.data;
  },

  deleteOrderProducts: async (orderId, productIds) => {
    const response = await orderApiClientV1.delete(
      `/order/${orderId}/products`,
      {
        data: { productIds },
      }
    );
    return response.data;
  },
};

export default orderService;
