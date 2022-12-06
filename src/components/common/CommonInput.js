import React, { useEffect, useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

import { Color } from "../../styles/color";
import { FontSize } from "../../styles/spacing";
import { CommonText } from "./CommonText";

export function CommonInput(props) {
    const {
        containerStyleWrapper,
        placeholder,
        valueError,
        Error,
        multiline,
        require,
        keyboardType,
        innerRef,
        label,
        ...rest
    } = props;
    // eslint-disable-next-line no-unused-vars
    const [text, setText] = useState("");
    useEffect(() => {
        setText(props.value || "");
    }, [props.value]);
    return (
        <>
            <View style={[{ ...containerStyleWrapper }, styles.container]}>
                {label && (
                    <CommonText style={styles.labelText}>
                        {label}{" "}
                        {require && (
                            <CommonText
                                text="*"
                                color="red"
                                style={{ fontSize: FontSize.Font15 }}
                            />
                        )}
                    </CommonText>
                )}
                <TextInput
                    placeholder={placeholder}
                    keyboardType={keyboardType}
                    onChangeText={(value) => {
                        setText(value);
                        props.onChangeText && props.onChangeText(value);
                    }}
                    placeholderTextColor="#979797"
                    ref={innerRef}
                    multiline={multiline}
                    blurOnSubmit={false}
                    style={[
                        {
                            width: "100%",
                            fontSize: label ? 20 : 16,
                            fontWeight: "500",
                            height: label ? (multiline ? 100 : 45) : 50,
                        },
                    ]}
                    {...rest}
                />
            </View>
            {Error && (
                <CommonText style={{ color: "red", fontSize: 11 }}>
                    * {valueError}
                </CommonText>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 4,
        justifyContent: "center",
        marginTop: 16,
        width: "100%",
        borderBottomWidth: 1,
        borderBottomColor: Color.Black,
    },
    labelText: {
        fontSize: FontSize.Font16,
    },
});
