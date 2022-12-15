import axios from "axios";

const axiosClient = axios.create({
    baseURL: "https://scanner-app-cms.up.railway.app/api/",
    headers: {
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json",
        timeout: 5000,
    },
});

export default axiosClient;
