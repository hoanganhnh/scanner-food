import axiosClient from "../services/axiosClient";
import { getData } from "./async-storage";

export const handleSaveTokenDevice = async (token, userId) => {
    try {
        const { data } = await axiosClient.get(
            `token-devices?filters[userId][$eq]=${userId}`
        );
        const existToken = await getData("TOKEN_DEIVCE");

        if (data?.data.length > 0) {
            if (data?.data[0]?.attributes.token !== existToken) {
                console.log("delete token");
                await axiosClient.delete(`token-devices/${data?.data[0].id}`);
                const res = await axiosClient.post("token-devices", {
                    data: {
                        token,
                        userId,
                    },
                });
                if (res.status === 200) {
                    console.log("save token device successfull");
                }
            }
        } else {
            const res = await axiosClient.post("token-devices", {
                data: {
                    token,
                    userId,
                },
            });
            if (res.status === 200) {
                console.log("save token device successfull");
            }
        }
    } catch (error) {
        console.log(error);
    }
};
