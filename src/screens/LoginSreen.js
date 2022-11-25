import * as React from "react";
import {
    Keyboard,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { CommonButton } from "../components/common/CommonButton/CommonButton";
import { CommonInput } from "../components/common/CommonInput/CommonInput";
import { CommonText } from "../components/common/CommonText/CommonText";
import { FontSize, FontWithBold, Spacing } from "../styles/spacing";
import { Device } from "../styles/values";

function LoginSreen({ navigation }) {
    const [userName, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [errorList, setErrorList] = React.useState([]);
    const passwordRef = React.useRef();

    const handleLogin = () => {
        Keyboard.dismiss();
        let err = [];
        if (!userName) {
            err.push("Email is require");
        }
        if (password === "") {
            err.push("Password is require");
        }
        setErrorList(err);
        if (err.length === 0) {
            console.log("login");
        }
    };
    const forgotPasswordNavigate = () => {
        navigation.navigate("ForgotPasswordScreen");
    };
    const registerNavigate = () => {
        navigation.navigate("RegisterScreen");
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
                            value={userName}
                            onChangeText={(e) => {
                                setUserName(e);
                            }}
                            keyboardType="email-address"
                            returnKeyType="next"
                            onSubmitEditing={() => {}}
                            maxLength={255}
                        />
                        <CommonInput
                            placeholder={"Password"}
                            value={password}
                            onChangeText={setPassword}
                            returnKeyType="done"
                            onSubmitEditing={handleLogin}
                            innerRef={passwordRef}
                            secureTextEntry
                        />
                        <TouchableOpacity
                            onPress={forgotPasswordNavigate}
                            style={styles.forgotButton}
                        >
                            <CommonText
                                style={styles.forgotButtonText}
                                text="Forgot password"
                                multiLanguage
                            />
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={registerNavigate}
                            style={styles.forgotButton}
                        >
                            <CommonText
                                style={styles.forgotButtonText}
                                text="Register"
                                multiLanguage
                            />
                        </TouchableOpacity>
                        <CommonButton title={"Login"} onPress={handleLogin} />
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

export default LoginSreen;
