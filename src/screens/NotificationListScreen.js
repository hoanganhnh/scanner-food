import React from "react";
import { format } from "date-fns";
import { useSelector } from "react-redux";
import { View, FlatList } from "react-native";
import { Icon, ListItem } from "react-native-elements";
import { useFocusEffect } from "@react-navigation/native";

import { selectAuth } from "../app/slices/auth";
import axiosClient from "../services/axiosClient";

function NotificationListScreen() {
    const [notifications, setNotifications] = React.useState([]);
    const { auth } = useSelector(selectAuth);

    const getNotfications = async () => {
        try {
            const { data } = await axiosClient.get(
                `/notifications?filters[userId][$eq]=${auth.id}`
            );
            const _notifications = data.data.map((item) => ({
                id: item.id,
                message: item.attributes.message,
                createdAt: item.attributes.createdAt,
            }));
            setNotifications(_notifications);
        } catch (error) {
            console.log("NotificationListScreen", error);
        }
    };
    useFocusEffect(
        React.useCallback(() => {
            Promise.all[getNotfications()];
        }, [])
    );

    return (
        <View>
            <FlatList
                data={notifications}
                keyExtractor={(a) => a.id}
                renderItem={({ item }) => {
                    return (
                        <ListItem bottomDivider>
                            <ListItem.Content>
                                <ListItem.Title style={{ marginBottom: 4 }}>
                                    {item.message}
                                </ListItem.Title>
                                <View
                                    style={{
                                        alignItems: "center",
                                        flexDirection: "row",
                                    }}
                                >
                                    <ListItem.Title style={{ marginRight: 4 }}>
                                        {format(
                                            new Date(item.createdAt),
                                            "dd/MM/YYY - hh:mm:ss"
                                        )}
                                    </ListItem.Title>
                                    <Icon name="av-timer" />
                                </View>
                            </ListItem.Content>
                        </ListItem>
                    );
                }}
            />
        </View>
    );
}

export default NotificationListScreen;
