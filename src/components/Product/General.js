import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import { Text, Icon } from "react-native-elements";
import { globalTextStyle } from "../../styles/global";
import { getColorScore } from "../../styles/product";
import {
    setProductFavorite,
    getProductFavoriteState,
} from "../../utils/database";

function General({ route }) {
    const {
        _id,
        product_name_en,
        image_front_url,
        quantity,
        nutriscore_grade,
        rev,
    } = route.params.item;
    const [favorite, setFavorite] = useState(false);
    const setFavoriteState = (favoriteState) => {
        if (favoriteState[0]["is_favorite"] != favorite) {
            setFavorite((_) => favoriteState[0]["is_favorite"]);
        }
    };

    useEffect(() => {
        (() => {
            getProductFavoriteState(_id, setFavoriteState);
        })();
    }, [route]);

    const onPress = () => {
        setFavorite((state) => !state);
        storeData(_id);
    };

    const storeData = (key) => {
        try {
            setProductFavorite(key, !favorite);
        } catch (error) {
            console.error(`error saving the product: ${error}`);
        }
    };
    return (
        <View style={{ alignItems: "center" }}>
            <View style={{ marginBottom: 3 }}>
                <Text style={{ fontSize: 20, padding: 20 }} h4>
                    {product_name_en}
                </Text>
            </View>
            <Text style={{ paddingBottom: 10 }} h4>
                {quantity ? `Amount: ${quantity}` : `Amount: N/A`}
            </Text>
            <View
                style={{
                    alignItems: "center",
                }}
            >
                <Image
                    source={{ uri: image_front_url }}
                    style={{ width: 200, height: 200 }}
                />
            </View>
            <Text
                style={[
                    globalTextStyle.description,
                    { color: getColorScore(nutriscore_grade) },
                ]}
            >
                The nutri score is {rev}/100
            </Text>
            <TouchableOpacity
                style={{ padding: 10, margin: 25, width: 100, height: 50 }}
                onPress={onPress}
            >
                {favorite ? (
                    <Icon name="heart" type="antdesign" />
                ) : (
                    <Icon name="hearto" type="antdesign" />
                )}
            </TouchableOpacity>
        </View>
    );
}

export default General;
