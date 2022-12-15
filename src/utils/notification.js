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

export async function scheduleAndCancel(date) {
    try {
        const identifier = await Notifications.scheduleNotificationAsync({
            content: {
                title: "Hey!",
            },
            trigger: { date: new Date(date) },
        });
        await Notifications.cancelScheduledNotificationAsync(identifier);
    } catch (error) {
        console.log(error);
    }
}
export async function scheduleNotification({ date, title, body }) {
    try {
        const identifier = await Notifications.scheduleNotificationAsync({
            content: {
                title: title,
                body: body,
                sound: true,
            },
            trigger: { date: new Date(date) },
        });
        console.log("identifier", identifier);
    } catch (error) {
        console.log(error);
    }
}
