import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import Modal from "react-native-modal";
import { useSelector } from "react-redux";

import { loadingSelector } from "../app/slices/loading";

export function LoadingModal() {
    const isLoading = useSelector(loadingSelector);
    return (
        <Modal isVisible={isLoading}>
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
    },
});
