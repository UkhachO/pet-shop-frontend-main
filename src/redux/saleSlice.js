import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api.js";

export const fetchSaleItems = createAsyncThunk("sale/fetchAll", async () => {
  const { data } = await api.get("/sale/all");
  return data;
});

const saleSlice = createSlice({
  name: "sale",
  initialState: { list: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchSaleItems.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSaleItems.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchSaleItems.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      }),
});

export default saleSlice.reducer;
