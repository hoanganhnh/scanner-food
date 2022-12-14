import axiosClient from "./axiosClient";

import store from "../app/store";

axiosClient.interceptors.request.use(async (request) => {
    const token = store.getState().auth.accessToken;

    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
});

export default axiosClient;
