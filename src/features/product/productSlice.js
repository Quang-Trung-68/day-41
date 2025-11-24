import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // Add product
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    //  Update product
    updateProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.id === action.payload.id
      );
      if (index !== -1) {
        state.products[index] = action.payload;
      }
    },
    //   Delete product
    deleteProduct: (state, action) => {
      state.products = state.products.filters(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const { addProduct, updateProduct, deleteProduct } =
  productSlice.actions;

export default productSlice.reducer;
