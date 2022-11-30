import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axiosClient from "../../services/axiosClient";

export const login = createAsyncThunk(
    "auth/local",
    async (values, { rejectWithValue }) => {
        try {
            const res = await axiosClient.post("auth/local", values);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

export const register = createAsyncThunk(
    "auth/local/register",
    async (values, { rejectWithValue }) => {
        try {
            const res = await axiosClient.post("auth/local/register", values);
            return res.data;
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

const initialState = {
    auth: null,
    isLoading: false,
    accessToken: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        logout: () => {
            return initialState;
        },
        setToken: (state, action) => {
            state.accessToken = action.payload;
        },
        setAuth: (state, action) => {
            state.auth = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.auth = action.payload;
            state.isLoading = false;
        });

        builder.addCase(login.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(login.rejected, (state) => {
            state.auth = null;
            state.isLoading = false;
        });

        builder.addCase(register.fulfilled, (state, action) => {
            state.auth = action.payload;
            state.isLoading = false;
        });
        builder.addCase(register.pending, (state) => {
            state.isLoading = true;
        });

        builder.addCase(register.rejected, (state) => {
            state.auth = null;
            state.isLoading = false;
        });
    },
});

export const selectAuth = (state) => state.auth;

export const isAuthenticated = (state) => {
    const currentUser = selectAuth(state);
    return !!currentUser.auth;
};

export const { logout, setToken, setAuth } = authSlice.actions;

const authReducer = authSlice.reducer;

export default authReducer;
