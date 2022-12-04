import React from "react";
import { Text, View } from "react-native";

function MealDetailScreen({ route }) {
    const { post } = route.params;
    console.log(post);
    return (
        <View>
            <Text>MealDetailScreen</Text>
        </View>
    );
}

export default MealDetailScreen;
