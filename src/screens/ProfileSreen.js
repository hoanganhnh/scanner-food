import React from "react";
import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    SafeAreaView,
    Alert,
} from "react-native";
import { Avatar, Button, Input } from "react-native-elements";
import { useDispatch, useSelector } from "react-redux";

import { selectAuth, setAuth } from "../app/slices/auth";
import axiosClient from "../services/axiosAuthen";

export default function ProfileScreen() {
    const { auth } = useSelector(selectAuth);

    const [age, setAge] = React.useState(() => (auth.age ? auth.age : ""));
    const [address, setAddress] = React.useState(() =>
        auth.address ? auth.address : ""
    );
    const [phone, setPhone] = React.useState(() =>
        auth.phone ? auth.phone : ""
    );

    const dispath = useDispatch();

    const updateProfile = async () => {
        try {
            const data = {
                age,
                address,
                phone,
            };
            const { status } = await axiosClient.post("/users/update-me", data);

            if (status === 200) {
                dispath(setAuth({ ...auth, ...data }));
                Alert.alert("Save profile successfull");
            }
        } catch (error) {
            console.log(error);
        }
    };

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
                            <Input
                                placeholder="Age"
                                value={age.toString()}
                                onChangeText={setAge}
                            />
                            <Text style={styles.label}>Phone</Text>
                            <Input
                                placeholder="Phone"
                                value={phone}
                                onChangeText={setPhone}
                            />
                            <Text style={styles.label}>Address</Text>
                            <Input
                                placeholder="Address"
                                value={address}
                                onChangeText={setAddress}
                            />
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
                            onPress={updateProfile}
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
