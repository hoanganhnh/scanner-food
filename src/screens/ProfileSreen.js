import React from "react";
import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import { Avatar, Button, Input } from "react-native-elements";
import { useSelector } from "react-redux";

import { selectAuth } from "../app/slices/auth";

// TODO: create update profile
export default function ProfileScreen() {
    const { auth } = useSelector(selectAuth);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View>
                    <View style={styles.avatar}>
                        <Avatar
                            rounded
                            size="large"
                            title={auth.username[0]}
                            containerStyle={{
                                backgroundColor: "#00BFFF",
                            }}
                        />
                    </View>

                    <View style={styles.body}>
                        <View style={styles.bodyContent}>
                            <Text style={styles.name}>{auth.username}</Text>
                            <Text style={styles.info}>{auth.email}</Text>
                        </View>
                        <View style={{ paddingHorizontal: 20 }}>
                            <Text style={styles.label}>Age</Text>
                            <Input placeholder="Age" />
                            <Text style={styles.label}>Phone</Text>
                            <Input placeholder="Phone" />
                            <Text style={styles.label}>Address</Text>
                            <Input placeholder="Address" />
                        </View>
                        <Button
                            title="Save"
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
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    avatar: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
    },
    name: {
        fontSize: 22,
        color: "#000",
        fontWeight: "600",
    },
    body: {
        marginTop: 10,
    },
    bodyContent: {
        alignItems: "center",
        padding: 30,
    },
    info: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10,
    },
    label: {
        fontSize: 18,
        textAlign: "center",
        color: "#696969",
    },
    description: {
        fontSize: 16,
        color: "#696969",
        marginTop: 10,
        textAlign: "center",
    },
    buttonContainer: {
        marginTop: 10,
        height: 45,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
        backgroundColor: "#00BFFF",
    },
});
