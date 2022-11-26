import axiosClient from "./axiosClient";

export const authen = {
    login: async (url, data) => {
        const res = await axiosClient.post(url, data);
        return res;
    },
    register: async (url, data) => {
        const res = await axiosClient.post(url, data);
        return res;
    },
};
