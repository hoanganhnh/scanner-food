import React, { createContext, useContext, useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import * as TaskManager from "expo-task-manager";

import useAsyncStorage from "../hooks/useAsyncStorage";
import { COLLECTION_NOTIFICATIONS } from "../constants/app";

const NotificationsContext = createContext({});

// defines how device should handle a notification when the app is running (foreground notifications)
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: true,
    }),
});

const NotificationsContextProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [badgeCount, setBadgeCount] = useState(0);
    const { getStoredItem, saveItemInStorage, removeStoredItem } =
        useAsyncStorage();

    // since every time the app is installed a new push token is assigned to the device,
    // and when user install the app must sign in or sign up, this ensures that correct token
    // is saved in the DB and permission are given
    // ask for permissions (only applicable for ios) and gets expoPushToken
    const registerForPushNotificationsAsync = async () => {
        try {
            const { status: existingStatus } =
                await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== "granted") {
                const { status } =
                    await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== "granted") {
                throw new Error("Permission not granted!");
            }
            // gets the token from expo server, which behind the scenes communicates with push
            // notifications servers that send notifications to different devices
            const token = (await Notifications.getExpoPushTokenAsync()).data;
            return token;
        } catch (error) {
            console.log("registerForPushNotifications", error);
        }
    };

    const fetchNotifications = async () => {
        // get not dismissed notifications
        // const notifications = await Notifications.getPresentedNotificationsAsync()
        const notificationList = await getStoredItem(COLLECTION_NOTIFICATIONS);
        !!notificationList?.length && setNotifications(notificationList);
    };

    const deleteNotification = async (notificationId) => {
        const updatedNotifications = notifications.filter(
            ({ id }) => id !== notificationId
        );
        setNotifications(updatedNotifications);
        await saveItemInStorage(COLLECTION_NOTIFICATIONS, updatedNotifications);
    };

    const deleteAllNotifications = async () => {
        setNotifications([]);
        await removeStoredItem(COLLECTION_NOTIFICATIONS);
        resetNewNotifications();
    };

    const handleNewNotification = async (
        notificationObject,
        navigationAction
    ) => {
        const isNotificationAlreadySaved = notifications.some(
            ({ id }) => id === notificationObject.messageId
        );
        try {
            // since expo-notifications currently does not have listeners to handle notifications received when
            // app is killed/closed, this if statement prevents that when this methods is called after user
            // interact with any notification (foreground, background or killed), only the notifications that were not
            // handle when received are handle when the user interacts
            if (!isNotificationAlreadySaved) {
                const newNotification = {
                    id: notificationObject.messageId,
                    date: notificationObject.sentTime,
                    title: notificationObject.data.title,
                    body: `${notificationObject.data.message}Solinca`,
                    data: JSON.parse(notificationObject.data.body),
                };

                setBadgeCount((prevCount) => prevCount + 1);
                // set badge number on app icon
                await Notifications.setBadgeCountAsync(badgeCount + 1);

                const notifications =
                    (await getStoredItem(COLLECTION_NOTIFICATIONS)) || [];
                const updatedNotifications = [
                    newNotification,
                    ...notifications,
                ];
                await setNotifications(updatedNotifications);
                await saveItemInStorage(
                    COLLECTION_NOTIFICATIONS,
                    updatedNotifications
                );
            }
            !!navigationAction && (await navigationAction());
        } catch (error) {
            console.log("handleNewNotification", error);
        }
    };

    const resetNewNotifications = async () => {
        setBadgeCount(0);
        await Notifications.setBadgeCountAsync(0);
    };

    const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";

    TaskManager.defineTask(
        BACKGROUND_NOTIFICATION_TASK,
        // eslint-disable-next-line no-unused-vars
        ({ data, error, executionInfo }) =>
            handleNewNotification(data.notification)
    );

    useEffect(() => {
        fetchNotifications();
        Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);

        const foregroundReceivedNotificationSubscription =
            // listener fired whenever a notification is received while the app is foregrounded
            Notifications.addNotificationReceivedListener((notification) => {
                // notification.request.trigger.remoteMessage
                handleNewNotification(
                    notification.request.trigger.remoteMessage
                );
            });

        return () => {
            foregroundReceivedNotificationSubscription.remove();
            Notifications.unregisterTaskAsync(BACKGROUND_NOTIFICATION_TASK);
        };
    }, []);

    return (
        <NotificationsContext.Provider
            value={{
                notifications,
                badgeCount,
                deleteNotification,
                deleteAllNotifications,
                registerForPushNotificationsAsync,
                resetNewNotifications,
                handleNewNotification,
            }}
        >
            {children}
        </NotificationsContext.Provider>
    );
};

const useNotifications = () => {
    const notificationsContext = useContext(NotificationsContext);
    return notificationsContext;
};

export { NotificationsContextProvider, useNotifications };
