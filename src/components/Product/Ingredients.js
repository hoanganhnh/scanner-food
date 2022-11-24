import React from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";
import { globalStyles } from "../../styles/global";

function Ingredients({ route }) {
    const { ingredients_text } = route.params.item;
    return (
        <View style={globalStyles.productContainer}>
            <Text style={globalStyles.paddingCenterPetit}>
                {ingredients_text ? ingredients_text : "N/A"}
            </Text>
        </View>
    );
}

export default Ingredients;
