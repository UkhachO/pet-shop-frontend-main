import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cart-slice";
import categoriesReducer from "./categoriesSlice";
import productsReducer from "./productsSlice";
import saleReducer from "./saleSlice";

export default configureStore({
  reducer: {
    cart: cartReducer,
    categories: categoriesReducer,
    products: productsReducer,
    sale: saleReducer,
  },
});
