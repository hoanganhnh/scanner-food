import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { format } from "date-fns";

import { globalStyles } from "../styles/global";

class ListItem extends React.Component {
    goTo(item) {
        this.props.navigation.navigate("Product", {
            product: item,
        });
    }

    render() {
        return (
            <View style={styles.item}>
                <View style={styles.itemContainer}>
                    <Image
                        style={globalStyles.stretch}
                        source={{
                            uri: this.props.item.image,
                        }}
                    />
                    <View style={styles.contentItem}>
                        <TouchableOpacity
                            onPress={() => this.goTo(this.props.item)}
                        >
                            <Text style={globalStyles.itemListTitle}>
                                {this.props.item.name.toUpperCase()}
                            </Text>
                        </TouchableOpacity>
                        <Text style={globalStyles.itemListRating}>
                            Time expiry:{" "}
                            {format(
                                new Date(this.props.item.purchaseDate),
                                "dd/MM/yyyy"
                            )}{" "}
                            {" - "}
                            {format(
                                new Date(this.props.item.expireDate),
                                "dd/MM/yyyy"
                            )}
                        </Text>
                        <Text style={globalStyles.itemListRating}>
                            Best before day:{" "}
                            {format(
                                new Date(this.props.item.bestBeforeDay),
                                "dd/MM/yyyy"
                            )}
                        </Text>
                        <Text style={globalStyles.itemListRating}>
                            Categories: {this.props.item.classification}
                        </Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#1d1d1d",
    },
    itemContainer: {
        flexDirection: "row",
    },

    contentItem: {
        width: "100%",
        marginLeft: 16,
    },
});

export default ListItem;
