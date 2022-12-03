import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

import { globalStyles, globalTextStyle } from "../styles/global";
// import { Color } from "../styles/color";

function HomeScreen({ navigation }) {
    const switchToMealScreen = () => {
        navigation.navigate("MealScreen");
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={{ alignItems: "center" }}>
                <Image
                    style={globalStyles.photo}
                    source={require("../../assets/Easyscan.png")}
                />
            </View>
            <Text style={globalTextStyle.welcome}>
                Welcome to Best Before !
            </Text>
            <Text style={globalTextStyle.description}>
                Best Before is a 100% standalone application that helps you
                manage products !
            </Text>
            <View
                style={{
                    marginTop: 24,
                    flexDirection: "row",
                    justifyContent: "center",
                }}
            >
                <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={switchToMealScreen}
                >
                    <Text style={styles.txtIcon}>Explore for Meal</Text>
                    <Icon size={32} name="set-meal" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    iconContainer: {
        alignItems: "center",
        justifyContent: "center",
        // borderColor: Color.Black,
        // borderStyle: "solid",
        // borderWidth: 1,
        // borderRadius: 30,
    },
    txtIcon: {
        marginBottom: 12,
    },
});

export default HomeScreen;
