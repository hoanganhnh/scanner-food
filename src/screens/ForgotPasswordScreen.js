import * as React from "react";
import {
    Keyboard,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    View,
    Alert,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { CommonButton } from "../components/common/CommonButton";
import { CommonInput } from "../components/common/CommonInput";
import { CommonText } from "../components/common/CommonText";
import axiosClient from "../services/axiosClient";
import { FontSize, Spacing } from "../styles/spacing";
import { Device } from "../styles/values";

function LoginSreen() {
    const [email, setEmail] = React.useState("");
    const [errorList, setErrorList] = React.useState([]);

    const handleSubmit = async () => {
        Keyboard.dismiss();
        let err = [];
        if (!email) {
            err.push("Email is require");
        }

        setErrorList(err);
        if (err.length === 0) {
            try {
                const { status } = await axiosClient.post(
                    "auth/forgot-password",
                    {
                        email,
                    }
                );
                if (status === 200) {
                    Alert.alert("Request successfull !");
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <SafeAreaView style={{ flex: 1 }}>
                <KeyboardAwareScrollView
                    contentContainerStyle={
                        errorList.length > 0
                            ? {
                                  justifyContent: "center",
                                  alignItems: "center",
                                  paddingTop: (Device.height / 2 - 175) / 2,
                              }
                            : {
                                  paddingTop: Device.height / 2 - 200,
                                  justifyContent: "center",
                                  alignItems: "center",
                              }
                    }
                >
                    {errorList.length > 0 && (
                        <View style={styles.errorView}>
                            {errorList.map((a, index) => (
                                <CommonText
                                    key={index}
                                    numberOfLines={2}
                                    style={styles.errorText}
                                    text={`\u2022 ${a}`}
                                />
                            ))}
                        </View>
                    )}
                    <View style={styles.contentContainer}>
                        <CommonInput
                            placeholder={"Email"}
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            returnKeyType="next"
                            onSubmitEditing={() => {}}
                            maxLength={255}
                        />
                        <CommonButton title={"Submit"} onPress={handleSubmit} />
                    </View>
                </KeyboardAwareScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: Device.width,
        height: Device.height,
    },
    contentContainer: {
        width: "100%",
        paddingHorizontal: 16,
        paddingVertical: 16,
        backgroundColor: "#fff",
        borderRadius: 4,
    },
    errorView: {
        backgroundColor: "#fef5f1",
        width: "95%",
        marginBottom: Spacing.height10,
        paddingVertical: Spacing.height10,
    },
    errorText: {
        fontSize: FontSize.Font14,
        marginHorizontal: Spacing.width10,
    },
});

export default LoginSreen;
