import React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import { Text, FlatList, View } from "react-native";
import { Card, Icon } from "react-native-elements";

import axiosClient from "../services/axiosClient";

function MealScreen() {
    const [meals, setMeals] = React.useState([]);

    const getMeals = async () => {
        try {
            const { data } = await axiosClient.get("/meals?populate=image");

            const _meals = data.data.map((item) => ({
                id: item.id,
                title: item.attributes.titlle,
                name: item.attributes.name,
                image: item.attributes.image.data.attributes.formats.large.url,
                cals: item.attributes.cals,
                direction: item.attributes.direction,
                timeCook: item.attributes.timeCook,
                ingredients: item.attributes.ingredients,
            }));

            setMeals(_meals);
        } catch (error) {
            console.log("Meal screen", error);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            Promise.all[getMeals()];
        }, [])
    );
    return (
        <View style={{ flex: 1, paddingVertical: 16 }}>
            <FlatList
                data={meals}
                renderItem={({ item }) => (
                    <Card>
                        <Card.Title style={{ paddingTop: 10 }}>
                            {item.name}
                        </Card.Title>
                        <Card.Divider />
                        <Card.Image
                            style={{ padding: 0 }}
                            source={{
                                uri: item.image,
                            }}
                        />
                        <Text style={{ marginVertical: 10 }}>{item.title}</Text>
                        <Text style={{ marginVertical: 4, fontWeight: "500" }}>
                            Directions:
                        </Text>
                        <Text style={{ marginVertical: 10, fontWeight: "400" }}>
                            {item.direction}
                        </Text>
                        <Text style={{ marginVertical: 4, fontWeight: "500" }}>
                            Ingredients:
                        </Text>
                        <Text style={{ marginBottom: 12 }}>
                            {item.ingredients}
                        </Text>
                        <View style={styles.iconGruop}>
                            <View
                                style={{
                                    ...styles.iconContainer,
                                    marginRight: 12,
                                }}
                            >
                                <Icon name="time-outline" type="ionicon" />
                                <Text style={{ fontSize: 16 }}>
                                    {item.timeCook} {"h"}
                                </Text>
                            </View>
                            <Text>{" - "}</Text>
                            <View
                                style={{
                                    ...styles.iconContainer,
                                    marginLeft: 12,
                                }}
                            >
                                <Icon name="energy" type="simple-line-icon" />
                                <Text style={{ fontSize: 16 }}>
                                    {item.cals} {"cals"}
                                </Text>
                            </View>
                        </View>
                    </Card>
                )}
                keyExtractor={(item) => item?.id?.toString()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    iconGruop: {
        flexDirection: "row",
        alignItems: "center",
    },
    iconContainer: {
        flexDirection: "row",
    },
});

export default MealScreen;
