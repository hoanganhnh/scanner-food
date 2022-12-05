import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
};

const productSlice = createSlice({
    name: "product",
    initialState: initialState,
    reducers: {
        setMyProducts: (state, action) => {
            state.products = action.payload;
        },
    },
});

export const selectProduct = (state) => state.product;

export const { setMyProducts } = productSlice.actions;

const productReducer = productSlice.reducer;

export default productReducer;
