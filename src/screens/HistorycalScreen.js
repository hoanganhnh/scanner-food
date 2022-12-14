import React from "react";
import {
    SafeAreaView,
    Text,
    SectionList,
    StyleSheet,
    View,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { Button } from "react-native-elements";

import ListItem from "../components/Listitem";
import axiosClient from "../services/axiosClient";
import { selectAuth } from "../app/slices/auth";
import { setMyProducts } from "../app/slices/product";
import { groupByKeyDay } from "../utils/array-helper";

function HistorycalScreen({ navigation }) {
    const [products, setProducts] = React.useState([]);

    const dispatch = useDispatch();
    const { auth } = useSelector(selectAuth);

    const getMyProducts = React.useCallback(async () => {
        if (!auth) {
            console.log("Must login!!!");
            return;
        }
        try {
            const res = await axiosClient.get(
                `products?filters[userId][$eq]=${auth.id}&populate=image`
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
                    createdAt: item.attributes.createdAt,
                    image: item.attributes.image.data.attributes.url,
                }));
                const newProducts = groupByKeyDay(_products, "createdAt");
                setProducts(newProducts);
                dispatch(setMyProducts(_products));
            }
        } catch (error) {
            console.log(error);
        }
    }, [dispatch, auth]);

    useFocusEffect(
        React.useCallback(() => {
            Promise.all[getMyProducts()];
        }, [])
    );

    const handleSwicthAddProduct = () => {
        navigation.navigate("AddNewProductStack");
    };

    return (
        <SafeAreaView style={styles.container}>
            {products.length > 0 ? (
                <SectionList
                    sections={products}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item }) => {
                        return <ListItem item={item} navigation={navigation} />;
                    }}
                    renderSectionHeader={({ section }) => (
                        <View style={{ paddingHorizontal: 24 }}>
                            <Text style={styles.heading}>
                                {section.createdAt}
                            </Text>
                        </View>
                    )}
                />
            ) : (
                <Button
                    title="Add product"
                    buttonStyle={{
                        backgroundColor: "rgba(39, 39, 39, 1)",
                    }}
                    containerStyle={{
                        marginVertical: 5,
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 1,
                    }}
                    titleStyle={{
                        color: "white",
                        marginHorizontal: 20,
                    }}
                    onPress={handleSwicthAddProduct}
                />
            )}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 12,
    },

    heading: {
        fontSize: 16,
    },
});

export default HistorycalScreen;
