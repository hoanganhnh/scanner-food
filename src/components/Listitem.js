import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { globalStyles } from "../styles/global";
import { getColorScore } from "../styles/product";

class ListItem extends React.Component {
    goTo(item) {
        this.props.navigation.navigate("Product", {
            item: item,
        });
    }

    render() {
        return (
            <View style={styles.item}>
                <TouchableOpacity onPress={() => this.goTo(this.props.item)}>
                    <Text style={globalStyles.itemListTitle}>
                        {this.props.item.product_name_en.toUpperCase()}
                    </Text>
                </TouchableOpacity>
                <View>
                    <Image
                        style={globalStyles.stretch}
                        source={{
                            uri: this.props.item.image_thumb_url,
                        }}
                    />
                    <Text style={globalStyles.itemListRating}>
                        {this.props.item.brands_tags}
                    </Text>
                    <Text
                        style={[
                            globalStyles.itemListRating,
                            {
                                color: getColorScore(
                                    this.props.item.nutriscore_grade
                                ),
                            },
                        ]}
                    >
                        La nutriScore est de {this.props.item.rev}/100
                    </Text>
                    <Text style={globalStyles.itemListRating}>Catégories:</Text>
                    <Text style={globalStyles.itemListRating}>
                        {this.props.item.categories}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#1d1d1d",
    },
});

export default ListItem;
