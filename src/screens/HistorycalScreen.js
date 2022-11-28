import React from "react";
import { View, FlatList } from "react-native";
import { Button } from "react-native-elements";

import ListItem from "../components/Listitem";
import { Products } from "../constants/products";
import { globalTextStyle } from "../styles/global";

function HistorycalScreen({ navigation }) {
    return (
        <View style={globalTextStyle.history}>
            <Button
                title="Remove All"
                type="outline"
                buttonStyle={{
                    borderWidth: 2,
                    borderColor: "black",
                    borderRadius: 30,
                }}
                containerStyle={{
                    marginHorizontal: 20,
                    marginVertical: 24,
                }}
                titleStyle={{
                    color: "black",
                }}
            />
            <FlatList
                data={Products}
                renderItem={({ item }) => (
                    <ListItem item={item} navigation={navigation} />
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>
    );
}

export default HistorycalScreen;
