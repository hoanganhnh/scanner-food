import React from "react";
import { useSelector } from "react-redux";
import {
    View,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Text,
} from "react-native";
import { Badge, Icon, ListItem } from "react-native-elements";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import { selectAuth } from "../app/slices/auth";
import axiosAuthen from "../services/axiosAuthen";
import { timeAgo } from "../utils/time";
import { useNotifications } from "../contexts/notification";

function NotificationListScreen() {
    const [notifications, setNotifications] = React.useState([]);
    const [loading, setLoading] = React.useState(false);

    const { notifications: notificationContexts, deleteNotification } =
        useNotifications();
    const { auth } = useSelector(selectAuth);

    const navigation = useNavigation();

    const getNotfications = async () => {
        setLoading(true);
        try {
            const { data } = await axiosAuthen.get(
                `/notifications?filters[userId][$eq]=${auth.id}`
            );
            const _notifications = data.data.map((item) => ({
                id: item.id,
                message: item.attributes.message,
                createdAt: item.attributes.createdAt,
                productId: item.attributes.productId,
            }));
            setNotifications(_notifications);
        } catch (error) {
            console.log("NotificationListScreen", error);
        }
        setLoading(false);
    };
    useFocusEffect(
        React.useCallback(() => {
            Promise.all[getNotfications()];
        }, [])
    );

    const onDeleteNotification = (id) => {
        try {
            Alert.alert(
                "Delete notifications",
                "Are you sure you want to delete ?",
                [
                    {
                        text: "Ok",
                        onPress: async () => {
                            console.log("delete notification id", id);
                            try {
                                const res = await axiosAuthen.delete(
                                    `notifications/${id}`
                                );

                                if (res.status == 200) {
                                    console.log("delete successfull");
                                    setNotifications((preState) =>
                                        preState.filter(
                                            (item) => item.id !== id
                                        )
                                    );
                                }
                            } catch (error) {
                                Alert.alert("Delete notification error !");
                                console.log(error);
                            }
                        },
                    },
                    {
                        text: "Cancel",
                        style: "cancel",
                    },
                ],
                {
                    cancelable: true,
                }
            );
        } catch (error) {
            console.log("onDeleteNotification", error);
        }
    };

    const swicthToProductDetail = async (id) => {
        try {
            const {
                data: { data },
            } = await axiosAuthen.get(`products/${id}?populate=image`);

            const product = {
                id: data.id,
                bestBeforeDay: data.attributes.bestBeforeDay,
                purchaseDate: data.attributes.purchaseDate,
                expireDate: data.attributes.expireDate,
                classification: data.attributes.classification,
                name: data.attributes.name,
                userId: data.attributes.userId,
                label: data.attributes.label,
                image: data.attributes.image.data.attributes.url,
            };

            navigation.navigate("Product", {
                product: product,
            });
        } catch (error) {
            console.log("swicthToProductDetail", error);

            if (error.response.data.error.status === 404) {
                Alert.alert("Product has deleted !");
            }
        }
    };

    return (
        <View style={{ flex: 1 }}>
            {loading && <ActivityIndicator size="large" color="#000" />}
            {notifications.length ? (
                <FlatList
                    data={notifications}
                    keyExtractor={(a) => a.id}
                    renderItem={({ item }) => {
                        const isNew =
                            notificationContexts.filter(
                                (noti) => noti.id === item.id
                            ).length === 1;

                        return (
                            <ListItem
                                bottomDivider
                                onPress={() => {
                                    swicthToProductDetail(item.productId);
                                    deleteNotification(item.id);
                                }}
                            >
                                <ListItem.Content>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            width: "100%",
                                        }}
                                    >
                                        <ListItem.Title
                                            style={{
                                                marginBottom: 4,
                                            }}
                                        >
                                            {item.message}
                                        </ListItem.Title>
                                        {isNew && <Badge status="primary" />}
                                    </View>
                                    <View style={styles.row}>
                                        <View
                                            style={{
                                                flexDirection: "row",
                                            }}
                                        >
                                            <ListItem.Title
                                                style={{ marginRight: 4 }}
                                            >
                                                {timeAgo(item.createdAt)}
                                            </ListItem.Title>
                                            <Icon name="av-timer" />
                                        </View>
                                        <TouchableOpacity
                                            onPress={() =>
                                                onDeleteNotification(item.id)
                                            }
                                        >
                                            <Icon
                                                name="delete"
                                                type="ant-design"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </ListItem.Content>
                            </ListItem>
                        );
                    }}
                />
            ) : (
                <View style={styles.txtCotainer}>
                    <Text style={styles.mainHeading}>No notifications</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        lignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    txtCotainer: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
    mainHeading: {
        fontSize: 24,
    },
});

export default NotificationListScreen;
