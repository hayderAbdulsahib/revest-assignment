import axios from "axios";

const API_VERSION_V1 = "v1";
const API_VERSION_V2 = "v2";

const productBaseUrlV1 = `${
  import.meta.env.VITE_PRODUCT_API_BASE_URL
}/${API_VERSION_V1}`;
const productBaseUrlV2 = `${
  import.meta.env.VITE_PRODUCT_API_BASE_URL
}/${API_VERSION_V2}`;

const orderBaseUrlV1 = `${
  import.meta.env.VITE_ORDER_API_BASE_URL
}/${API_VERSION_V1}`;
const orderBaseUrlV2 = `${
  import.meta.env.VITE_ORDER_API_BASE_URL
}/${API_VERSION_V2}`;

// Product service clients
export const productApiClientV1 = axios.create({
  baseURL: productBaseUrlV1,
  headers: {
    "Content-Type": "application/json",
  },
});

export const productApiClientV2 = axios.create({
  baseURL: productBaseUrlV2,
  headers: {
    "Content-Type": "application/json",
  },
});

// Order service clients
export const orderApiClientV1 = axios.create({
  baseURL: orderBaseUrlV1,
  headers: {
    "Content-Type": "application/json",
  },
});

export const orderApiClientV2 = axios.create({
  baseURL: orderBaseUrlV2,
  headers: {
    "Content-Type": "application/json",
  },
});

// Export all base URLs
export { productBaseUrlV1, productBaseUrlV2, orderBaseUrlV1, orderBaseUrlV2 };
