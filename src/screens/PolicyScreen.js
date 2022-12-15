import React from "react";
import { Text, SafeAreaView, StyleSheet } from "react-native";

function PolicyScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Text>Policy app</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 12,
        marginHorizontal: 16,
    },
});

export default PolicyScreen;
