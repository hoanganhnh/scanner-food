import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Alert, Platform } from "react-native";
import { openSettings, openURL } from "expo-linking";
import { storeData } from "../utils/async-storage";

export const useNotifications = () => {
    const registerForPushNotificationsAsync = async (alertUser) => {
        if (Device.isDevice) {
            const { status: existingStatus } =
                await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== "granted") {
                const { status } =
                    await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }

            if (finalStatus !== "granted") {
                if (alertUser)
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

                throw new Error("User doesn't allow for notifications");
            }
            const token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log("token-device -->", token);
            await storeData("TOKEN_DEIVCE", token);
        } else {
            alert("Must use physical device for Push Notifications");
        }

        if (Platform.OS === "android") {
            Notifications.setNotificationChannelAsync("default", {
                name: "default",
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: "#FF231F7C",
            });
        }
    };

    // This listener is fired whenever a notification is received while the app is foregrounded
    const handleNotification = (notification) => {
        console.log(notification);
        // could be useful if you want to display your own toast message
        // could also make a server call to refresh data in other part of the app
    };

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    const handleNotificationResponse = (response) => {
        const data = response.notification.request.content.data;
        console.log(data);
        if (data?.url) {
            openURL(data.url);
        }
    };

    return {
        registerForPushNotificationsAsync,
        handleNotification,
        handleNotificationResponse,
    };
};
