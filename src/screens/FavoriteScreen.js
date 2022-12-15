import React from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet } from "react-native";
import { Button, Card } from "react-native-elements";
import { useSelector } from "react-redux";
import { Ionicons, AntDesign } from "@expo/vector-icons";

import { selectAuth } from "../app/slices/auth";
import { FlatList } from "react-native";
import axiosClient from "../services/axiosClient";
import { LABELS } from "../constants/label";
import { format } from "date-fns";

function FavoriteScreen() {
    const [products, setProducts] = React.useState([]);

    const { auth } = useSelector(selectAuth);

    const navigation = useNavigation();

    const getMyProducts = React.useCallback(async () => {
        if (!auth) {
            console.log("Must login!!!");
            return;
        }
        try {
            const res = await axiosClient.get(
                `products?filters[userId][$eq]=${auth.id}&filters[like][$eq]=true&populate=image`
            );
            if (res.status == 200) {
                const _products = res.data.data.map((item) => ({
                    id: item.id,
                    name: item.attributes.name,
                    purchaseDate: item.attributes.purchaseDate,
                    expireDate: item.attributes.expireDate,
                    classification: item.attributes.classification,
                    bestBeforeDay: item.attributes.bestBeforeDay,
                    like: item.attributes.like,
                    label: item.attributes.label,
                    image: item.attributes.image.data.attributes.url,
                }));
                setProducts(_products);
            }
        } catch (error) {
            console.log(error);
        }
    }, [auth]);

    useFocusEffect(
        React.useCallback(() => {
            Promise.all[getMyProducts()];
        }, [])
    );
    const switchDetailProduct = (product) => {
        navigation.navigate("Product", {
            product: product,
        });
    };
    return (
        <View style={styles.container}>
            {products.length ? (
                <FlatList
                    data={products}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Card>
                                <Card.Image
                                    source={{
                                        uri: item.image,
                                    }}
                                    style={{ height: 400, width: "100%" }}
                                />
                                <Card.Title style={{ marginTop: 12 }}>
                                    {item.name}
                                </Card.Title>
                                <View>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Ionicons
                                            name="time-outline"
                                            size={20}
                                            color="black"
                                            style={{ marginRight: 4 }}
                                        />
                                        <Text style={{ marginRight: 12 }}>
                                            Time:
                                        </Text>
                                        <View style={{ flexDirection: "row" }}>
                                            <Text>
                                                {format(
                                                    new Date(item.purchaseDate),
                                                    "dd/MM/yyyy"
                                                )}
                                            </Text>
                                            <Text>{" - "}</Text>
                                            <Text>
                                                {format(
                                                    new Date(item.expireDate),
                                                    "dd/MM/yyyy"
                                                )}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        marginBottom: 10,
                                        flexDirection: "row",
                                        alignItems: "center",
                                    }}
                                >
                                    <AntDesign
                                        name="check"
                                        size={20}
                                        color="black"
                                        style={{ marginRight: 4 }}
                                    />
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Text>
                                            Classification:{" "}
                                            {item.classification}
                                        </Text>
                                        {LABELS[item.label] && (
                                            <Text style={{ marginLeft: 24 }}>
                                                Label:{" "}
                                                <View
                                                    style={{
                                                        backgroundColor:
                                                            LABELS[item.label],
                                                        width: 24,
                                                        height: 12,
                                                        borderRadius: 30,
                                                    }}
                                                />
                                            </Text>
                                        )}
                                    </View>
                                </View>
                                <Button
                                    buttonStyle={{
                                        borderRadius: 0,
                                        marginLeft: 0,
                                        marginRight: 0,
                                        marginBottom: 0,
                                    }}
                                    title="View"
                                    onPress={() => switchDetailProduct(item)}
                                />
                            </Card>
                        </View>
                    )}
                    listKey={({ item }) => item.id}
                />
            ) : (
                <View style={styles.mainHeading}>
                    <Text style={{ fontSize: 20 }}>No Favorites Product</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    item: {
        paddingVertical: 16,
    },
    mainHeading: {
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
    },
});

export default FavoriteScreen;
