import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { orderService } from "../../api/orderService";

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (_, { rejectWithValue }) => {
    try {
      const data = await orderService.getOrders();
      return data?.orders || [];
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const data = await orderService.createOrder(orderData);
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data || error.message);
    }
  }
);

export const updateOrder = createAsyncThunk(
  "orders/updateOrder",
  async ({ id, ...orderData }, { rejectWithValue }) => {
    try {
      const data = await orderService.updateOrder(id, orderData);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteOrder = createAsyncThunk(
  "orders/deleteOrder",
  async (id, { rejectWithValue }) => {
    try {
      await orderService.deleteOrder(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteOrderProducts = createAsyncThunk(
  "orders/deleteOrderProducts",
  async ({ orderId, productIds }, { rejectWithValue }) => {
    try {
      const data = await orderService.deleteOrderProducts(orderId, productIds);
      return { orderId, productIds, data };
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch orders
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "something went wrong";
      })
      // Create order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.unshift(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "something went wrong";
      })
      // Update order
      .addCase(updateOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex(
          (order) => order.id === action.payload.id
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updateOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "something went wrong";
      })
      // Delete order
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(
          (order) => order.id !== action.payload
        );
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "something went wrong";
      })
      // Delete order products
      .addCase(deleteOrderProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrderProducts.fulfilled, (state, action) => {
        state.loading = false;
        // Update the specific order in the orders array
        const orderIndex = state.orders.findIndex(
          (order) => order.id === action.payload.orderId
        );
        if (orderIndex !== -1) {
          // Remove the deleted products from the order
          state.orders[orderIndex].orderProducts = state.orders[
            orderIndex
          ].orderProducts.filter(
            (orderProduct) =>
              !action.payload.productIds.includes(orderProduct.productId)
          );
        }
      })
      .addCase(deleteOrderProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "something went wrong";
      });
  },
});

export const { clearError } = orderSlice.actions;
export default orderSlice.reducer;
