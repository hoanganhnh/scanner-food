import * as React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import { Button, ListItem } from "react-native-elements";
import { useDispatch } from "react-redux";

import { logout } from "../app/slices/auth";

function SettingSreen({ navigation }) {
    const dispath = useDispatch();

    const handleLogout = () => {
        console.log("log out");
        dispath(logout());
    };
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={{ flex: 1, paddingVertical: 12 }}>
                    <ListItem
                        onPress={() => {
                            navigation.navigate("ProfileSreen");
                        }}
                    >
                        <ListItem.Content>
                            <ListItem.Title>{"Profile"}</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                    <ListItem
                        onPress={() => {
                            navigation.navigate("Favorites");
                        }}
                    >
                        <ListItem.Content>
                            <ListItem.Title>
                                {"Favorites Product"}
                            </ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                    <ListItem
                        onPress={() => {
                            navigation.navigate("NotificationList");
                        }}
                    >
                        <ListItem.Content>
                            <ListItem.Title>{"Notifications"}</ListItem.Title>
                        </ListItem.Content>
                        <ListItem.Chevron />
                    </ListItem>
                    <Button
                        title="Log out"
                        buttonStyle={{
                            backgroundColor: "black",
                            borderWidth: 2,
                            borderColor: "white",
                            borderRadius: 30,
                        }}
                        containerStyle={{
                            marginHorizontal: 20,
                            marginVertical: 24,
                        }}
                        titleStyle={{ fontWeight: "bold" }}
                        onPress={handleLogout}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default SettingSreen;
