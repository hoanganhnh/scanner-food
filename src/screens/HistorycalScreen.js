import React from "react";
import { View, FlatList } from "react-native";
import { useDispatch, useSelector } from "react-redux";

import ListItem from "../components/Listitem";
import axiosClient from "../services/axiosClient";
import { globalTextStyle } from "../styles/global";
import { selectAuth } from "../app/slices/auth";
import { convertToddMMYYY } from "../utils/formatDate";
import { setMyProducts } from "../app/slices/product";

function HistorycalScreen({ navigation }) {
    const [products, setProducts] = React.useState([]);

    const dispatch = useDispatch();

    const { auth } = useSelector(selectAuth);

    React.useEffect(() => {
        // @TODO: cahched my products
        const getMyProducts = async () => {
            try {
                const res = await axiosClient.get(
                    `products?filters[userId][$eq]=${auth.id}&populate=image`
                );

                if (res.status === 200) {
                    console.log(res.data);
                    const _products = res.data.data.map((item) => ({
                        id: item.attributes.id,
                        name: item.attributes.name,
                        purchaseDate: convertToddMMYYY(
                            item.attributes.purchaseDate
                        ),
                        expireDate: convertToddMMYYY(
                            item.attributes.expireDate
                        ),
                        classification: item.attributes.classification,
                        image: item.attributes.image.data.attributes.formats
                            .thumbnail.url,
                        bestBeforeDay: item.attributes.bestBeforeDay,
                    }));
                    setProducts(_products);
                    dispatch(setMyProducts(_products));
                }
            } catch (error) {
                console.log(error);
            }
        };
        getMyProducts();
    }, [auth.id]);

    console.log(products);
    return (
        <View style={globalTextStyle.history}>
            <FlatList
                data={products}
                renderItem={({ item }) => (
                    <ListItem item={item} navigation={navigation} />
                )}
                keyExtractor={(item) => item?.id?.toString()}
            />
        </View>
    );
}

export default HistorycalScreen;
