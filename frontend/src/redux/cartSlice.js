import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fetchFromLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(cart);
  } else {
    return [];
  }
};
const storeInLocalStorage = (data) => {
  localStorage.setItem("cart", JSON.stringify(data));
};

const initialState = {
  carts: fetchFromLocalStorage(),
};

export const generalSlice = createSlice({
  name: "general",
  initialState,
  adToCart: {
    getKeyword: (state, action) => {
      const isItemCart = state.carts.find(
        (cart) => cart.id == action.payload.id
      );
      if (isItemCart) {
        const tempCart = state.carts.map((item) => {
          if (item.id == action.payload.id) {
            let tempQuantity = item.quantity + action.payload.quantity;
            return { ...item, quantity: tempQuantity };
          } else {
            return item;
          }
        });
        state.carts = tempCart;
        storeInLocalStorage(state.carts);
      } else {
        state.carts.push(action.payload);
        storeInLocalStorage(state.carts);
      }
    },
    removeFromCart: (state, action) => {
      const tepmCart = state.carts.filter((item) => item.id != action.payload);
      state.carts = tepmCart;
      storeInLocalStorage(state.carts);
    },

    clearCart: (state, action) => {
      state.carts = [];
      storeInLocalStorage(state.carts);
    },
  },
});

export const { adToCart, removeFromCart, clearCart } = generalSlice.actions;

export default generalSlice.reducer;
