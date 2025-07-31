import { createSlice } from "@reduxjs/toolkit";

const stored = localStorage.getItem("cartItems");
const initialItems = stored ? JSON.parse(stored) : [];

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: initialItems,
  },
  reducers: {
    addItem(state, action) {
      const { id, title, image, price, originalPrice, quantity } =
        action.payload;
      const exist = state.items.find((i) => i.id === id);
      if (exist) {
        exist.quantity += quantity;
      } else {
        state.items.push({ id, title, image, price, originalPrice, quantity });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeItem(state, action) {
      const { id, decrement } = action.payload;
      const exist = state.items.find((i) => i.id === id);
      if (!exist) return;
      if (decrement) {
        exist.quantity = Math.max(1, exist.quantity - 1);
      } else {
        state.items = state.items.filter((i) => i.id !== id);
      }
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    clearCart(state) {
      state.items = [];
      localStorage.removeItem("cartItems");
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
