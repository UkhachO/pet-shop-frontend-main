import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api.js";

export const fetchProducts = createAsyncThunk("products/fetchAll", async () => {
  const { data } = await api.get("/products/all");
  return data;
});

export const fetchProductById = createAsyncThunk(
  "products/fetchById",
  async (id) => {
    const { data } = await api.get(`/products/${id}`);

    return data[0];
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState: {
    list: [],
    current: null,
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProductById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.current = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      }),
});

export default productsSlice.reducer;
