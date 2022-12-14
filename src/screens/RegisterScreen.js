import { unwrapResult } from "@reduxjs/toolkit";
import * as React from "react";
import {
    Alert,
    Keyboard,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch } from "react-redux";

import { FontSize, FontWithBold, Spacing } from "../styles/spacing";
import { register, setAuth, setToken } from "../app/slices/auth";
import { Device } from "../styles/values";
import { CommonInput } from "../components/common/CommonInput";
import { CommonText } from "../components/common/CommonText";
import { CommonButton } from "../components/common/CommonButton";
import { toggleLoading } from "../app/slices/loading";
import { getData, storeData } from "../utils/async-storage";
import { handleSaveTokenDevice } from "../utils/save-token-device";
import { ACCESS_TOKEN } from "../constants/app";

// @TODO: handle validate
function RegisterScreen({ navigation }) {
    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [errorList, setErrorList] = React.useState([]);
    const passwordRef = React.useRef();

    const dispath = useDispatch();

    const handleRegister = async () => {
        Keyboard.dismiss();
        let err = [];
        if (email === "") {
            err.push("Email is require");
        }
        if (!userName) {
            err.push("Username is require");
        }
        if (password === "") {
            err.push("Password is require");
        }
        setErrorList(err);
        if (err.length === 0) {
            dispath(toggleLoading(true));
            try {
                const payload = {
                    username: userName,
                    email,
                    password,
                };
                const result = await dispath(register(payload));
                const { jwt, user } = unwrapResult(result);
                dispath(setToken(jwt));
                storeData(ACCESS_TOKEN, jwt);
                dispath(setAuth(user));
                const data = await getData("TOKEN_DEIVCE");
                await handleSaveTokenDevice(data, user.id);
            } catch (error) {
                console.log(error);
                dispath(toggleLoading(false));
                if (error.error) {
                    Alert.alert(error.error.message);
                }
            }
        }
        dispath(toggleLoading(false));
    };
    const loginNavigate = () => {
        navigation.navigate("LoginSreen");
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
                            onChangeText={(e) => {
                                setEmail(e);
                            }}
                            keyboardType="email-address"
                            returnKeyType="next"
                            onSubmitEditing={() => {}}
                            maxLength={255}
                        />
                        <CommonInput
                            placeholder={"Username"}
                            value={userName}
                            onChangeText={(e) => {
                                setUserName(e);
                            }}
                            returnKeyType="next"
                            onSubmitEditing={() => {}}
                            maxLength={255}
                        />
                        <CommonInput
                            placeholder={"Password"}
                            value={password}
                            onChangeText={setPassword}
                            returnKeyType="done"
                            onSubmitEditing={() => {}}
                            innerRef={passwordRef}
                            secureTextEntry
                        />
                        <TouchableOpacity
                            onPress={loginNavigate}
                            style={styles.forgotButton}
                        >
                            <CommonText
                                style={styles.forgotButtonText}
                                text="Login"
                                multiLanguage
                            />
                        </TouchableOpacity>
                        <CommonButton
                            title={"Register"}
                            onPress={handleRegister}
                        />
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
    forgotButtonText: {
        textAlign: "center",
        fontSize: FontSize.Font13,
        ...FontWithBold.Bold_600,
    },
    forgotButton: {
        marginVertical: Spacing.height12,
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

export default RegisterScreen;
