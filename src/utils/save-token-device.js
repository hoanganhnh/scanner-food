import { Alert } from "react-native";
import { openSettings } from "expo-linking";

import axiosClient from "../services/axiosClient";

export const handleSaveTokenDevice = async (token, userId) => {
    try {
        if (!token) {
            Alert.alert(
                "Error",
                "To enable Push Notifications please change your settings.",
                [
                    {
                        text: "OK",
                    },
                    {
                        text: "Open Settings",
                        onPress: openSettings,
                    },
                ]
            );
        }
        const { data } = await axiosClient.get(
            `token-devices?filters[userId][$eq]=${userId}`
        );

        if (data?.data.length > 0) {
            if (data?.data[0]?.attributes.token !== token) {
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
