import { productApiClientV1 } from "./apiClient";

// Product service functions
export const productService = {
  getProducts: async () => {
    const response = await productApiClientV1.get("/product?page=1&limit=100");
    return response.data;
  },

  getProductById: async (id) => {
    const response = await productApiClientV1.get(`/product/${id}`);
    return response.data;
  },

  createProduct: async (productData) => {
    const response = await productApiClientV1.post("/product", productData);
    return response.data;
  },

  updateProduct: async (id, productData) => {
    const response = await productApiClientV1.put(
      `/product/${id}`,
      productData,
    );
    return response.data;
  },

  deleteProduct: async (id) => {
    const response = await productApiClientV1.delete(`/product/${id}`);
    return response.data;
  },
};

export default productService;
