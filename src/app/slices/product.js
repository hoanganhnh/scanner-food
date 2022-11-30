import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    product: {},
};

const productSlice = createSlice({
    name: "product",
    initialState: initialState,
    reducers: {
        setMyProducts: (state, action) => {
            state.product = action.payload;
        },
    },
});

export const selectProduct = (state) => state.product;

export const { setMyProducts } = productSlice.actions;

const productReducer = productSlice.reducer;

export default productReducer;
