import React from "react";
import { StyleSheet, TouchableOpacity, Image } from "react-native";

import { Color } from "../../styles/color";
import { FontSize, FontWithBold, Spacing } from "../../styles/spacing";
import { CommonText } from "./CommonText";

export const CommonButton = (props) => {
    let { title, disabled, onPress, style, icon, textStyle, ...rest } = props;
    if (icon) {
        return (
            <TouchableOpacity
                {...rest}
                activeOpacity={0.8}
                disabled={disabled}
                onPress={onPress}
                style={[
                    styles.buttonWithIcon,
                    { backgroundColor: disabled ? "#F0F0F0" : Color.Black },
                    style,
                ]}
            >
                <Image source={icon} style={styles.icon} resizeMode="contain" />
                <CommonText style={[styles.buttonWidthIconText, textStyle]}>
                    {title}
                </CommonText>
            </TouchableOpacity>
        );
    } else {
        return (
            <TouchableOpacity
                {...rest}
                disabled={disabled}
                activeOpacity={0.8}
                onPress={onPress}
                style={[
                    styles.button,
                    { backgroundColor: disabled ? "#F0F0F0" : Color.Black },
                    style,
                ]}
            >
                <CommonText style={[styles.buttonText, textStyle]}>
                    {title}
                </CommonText>
            </TouchableOpacity>
        );
    }
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        height: 56,
        marginVertical: Spacing.height10,
        paddingVertical: Spacing.width5,
    },
    buttonText: {
        ...FontWithBold.Bold_700,
        color: Color.White,
        fontSize: FontSize.Font20,
        lineHeight: Spacing.height30,
        textTransform: "capitalize",
    },
    buttonWithIcon: {
        justifyContent: "center",
        alignItems: "center",
        height: 56,
        color: Color.White,
        marginVertical: Spacing.height10,
        paddingVertical: Spacing.width5,
        flexDirection: "row",
    },
    buttonWidthIconText: {
        ...FontWithBold.Bold_600,
        color: "white",
        fontSize: FontSize.Font17,
        lineHeight: Spacing.height30,
        textTransform: "capitalize",
    },
    icon: {
        marginRight: Spacing.width10,
    },
});
