import React from "react";
import { TextInput, StyleSheet, View } from "react-native";

function InputBase({ onChangeText, placeholder, secureTextEntry = false }) {
    return (
        <View style={styles.container}>
            <TextInput
                placeholderTextColor="#979797"
                placeholder={placeholder}
                onChangeText={onChangeText}
                style={{
                    width: "100%",
                    fontSize: 16,
                    fontWeight: "500",
                    height: 50,
                }}
                secureTextEntry={secureTextEntry}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        marginTop: 16,
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: "rgba(39, 39, 39, 1)",
    },
});

export default InputBase;
