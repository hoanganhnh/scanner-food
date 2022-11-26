import { createSlice } from "@reduxjs/toolkit";

const loadingSplice = createSlice({
    name: "loading",
    initialState: {
        isLoading: false,
    },
    reducers: {
        toggleLoading: (state, action) => {
            state.isLoading = action.payload;
        },
    },
});

export const { toggleLoading } = loadingSplice.actions;
export const loadingSelector = (state) => {
    const { isLoading } = state.loading;
    return isLoading;
};
const loadingReducer = loadingSplice.reducer;
export default loadingReducer;
