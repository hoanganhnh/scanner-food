import * as React from "react";
import { Text as ReactNativeText } from "react-native";

import { Color } from "../../styles/color";
import { FontSize, FontWithBold } from "../../styles/spacing";

export function CommonText(props) {
    // grab the props
    const {
        text = "",
        children,
        style,
        bold,
        numberOfLines = 1,
        color,
        onPress,
        ...rest
    } = props;

    return (
        <ReactNativeText
            numberOfLines={numberOfLines}
            {...rest}
            onPress={onPress}
            allowFontScaling={false}
            style={[
                {
                    color: color ? color : Color.Black,
                    fontSize: FontSize.Font13,
                    lineHeight: 25,
                },
                bold ? { ...FontWithBold.Bold_600 } : {},
                style,
            ]}
        >
            {text || children}
        </ReactNativeText>
    );
}
