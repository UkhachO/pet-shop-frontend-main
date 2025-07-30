import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/api.js";

export const fetchCategories = createAsyncThunk(
  "categories/fetchAll",
  async () => {
    const { data } = await api.get("/categories");
    return data;
  }
);

const categoriesSlice = createSlice({
  name: "categories",
  initialState: { list: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      }),
});

export default categoriesSlice.reducer;
