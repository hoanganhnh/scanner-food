import axios from "axios";

const axiosClient = axios.create({
    baseURL: "http://192.168.1.16:1337/api/",
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
        timeout: 5000,
    },
});

export default axiosClient;
