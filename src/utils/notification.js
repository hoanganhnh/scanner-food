import * as Notifications from "expo-notifications";

export async function schedulePushNotification() {
    const identifier = await Notifications.scheduleNotificationAsync({
        content: {
            title: "You've got mail! 📬",
            body: "Here is the notification body",
        },
        trigger: { seconds: 5 },
    });
    return identifier;
}

export async function scheduleAndCancel() {
    const identifier = await Notifications.scheduleNotificationAsync({
        content: {
            title: "Hey!",
        },
        trigger: { seconds: 60, repeats: true },
    });
    await Notifications.cancelScheduledNotificationAsync(identifier);
}
