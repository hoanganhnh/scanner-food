import React from "react";
import { View, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { useFocusEffect } from "@react-navigation/native";
import { Button } from "react-native-elements";

import ListItem from "../components/Listitem";
import axiosClient from "../services/axiosClient";
import { globalTextStyle } from "../styles/global";
import { selectAuth } from "../app/slices/auth";
import { setMyProducts } from "../app/slices/product";

function HistorycalScreen({ navigation }) {
    const [products, setProducts] = React.useState([]);

    const dispatch = useDispatch();
    const { auth } = useSelector(selectAuth);

    const getMyProducts = React.useCallback(async () => {
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
                    image: item.attributes.image.data.attributes.formats
                        .thumbnail.url,
                }));
                setProducts(_products);
                dispatch(setMyProducts(_products));
            }
        } catch (error) {
            console.log(error);
        }
    }, [setMyProducts, auth.id]);

    useFocusEffect(
        React.useCallback(() => {
            Promise.all[getMyProducts()];
        }, [])
    );

    const handleSwicthAddProduct = () => {
        navigation.navigate("AddNewProductStack");
    };

    return (
        <View style={globalTextStyle.history}>
            {products.length > 0 ? (
                <FlatList
                    data={products}
                    renderItem={({ item }) => (
                        <ListItem item={item} navigation={navigation} />
                    )}
                    keyExtractor={(item) => item?.id?.toString()}
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
        </View>
    );
}

export default HistorycalScreen;
