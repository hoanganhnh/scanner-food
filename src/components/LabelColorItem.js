import React from "react";
import { TouchableOpacity } from "react-native";
import { ListItem } from "react-native-elements";

function LabelColorItem({ onChooseLabel, color = "#dc143c", style = {} }) {
    return (
        <TouchableOpacity onPress={onChooseLabel}>
            <ListItem
                containerStyle={{
                    backgroundColor: color,
                    borderRadius: 30,
                    ...style,
                }}
            />
        </TouchableOpacity>
    );
}

export default LabelColorItem;
