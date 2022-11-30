import React from "react";
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from "react-native";
import { Icon, Input, Button } from "react-native-elements";
import * as ImagePicker from "expo-image-picker";
import { SelectList } from "react-native-dropdown-select-list";
import { format } from "date-fns";

import { Device } from "../styles/values";
import { classificationData } from "../constants/classifications";
import DatePicker from "../components/DatePicker";
import axiosClient from "../services/axiosClient";

function ProductDetailScreen({ route, navigation }) {
    const { product } = route.params;

    const [image, setImage] = React.useState(null);
    const [classification, setClassification] = React.useState([]);
    const [datePurchase, setDatePurchase] = React.useState("");
    const [dateExpired, setDateExpired] = React.useState("");
    const [nameProduct, setNameProduct] = React.useState("");
    const [bestBeforeDay, setBestBeforeDay] = React.useState(
        `${product.bestBeforeDay}`
    );
    const [favorite, setFavorite] = React.useState(product.like);

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });

            if (!result.canceled) {
                setImage(result.uri);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangeNameProduct = (value) => {
        setNameProduct(value);
    };

    const handleBestBeforeDay = (value) => {
        const day = value.replace(/[^0-9]/g, "");
        setBestBeforeDay(day);
    };

    const handleFavorite = () => {
        setFavorite((state) => !state);
    };

    const handleUpdate = () => {
        console.log("update");
    };

    const handleDeleteProduct = () => {
        Alert.alert(
            "Delete products",
            "Are you sure you want to delete?",
            [
                {
                    text: "Ok",
                    onPress: async () => {
                        console.log("delete product id", product.id);
                        try {
                            const res = await axiosClient.delete(
                                `products/${product.id}`
                            );

                            if (res.status == 200) {
                                console.log("delete successfull");
                                navigation.goBack();
                            }
                        } catch (error) {
                            Alert.alert("Delete product error !");
                            console.log(error);
                        }
                    },
                },
                {
                    text: "Cancel",
                    style: "cancel",
                },
            ],
            {
                cancelable: true,
            }
        );
    };

    return (
        <View style={styles.wrapper}>
            <SafeAreaView>
                <ScrollView>
                    <Image
                        style={styles.image}
                        source={{ uri: image ? image : product.image }}
                    />
                    <View style={styles.container}>
                        <Text style={{ fontSize: 16, marginVertical: 12 }}>
                            Get image product:
                        </Text>
                        <View style={styles.iconContainer}>
                            <Text style={styles.icon}>
                                <Icon
                                    onPress={pickImage}
                                    name="image"
                                    type="font-awesome"
                                    size={36}
                                />
                            </Text>
                            <Text>
                                <Icon
                                    name="camera"
                                    type="font-awesome"
                                    size={36}
                                />
                            </Text>
                        </View>
                        <Text style={{ fontSize: 16, marginVertical: 12 }}>
                            Name product:
                        </Text>
                        <Input
                            value={nameProduct || product.name}
                            onChangeText={handleChangeNameProduct}
                            placeholder="Name product..."
                        />
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                            }}
                        >
                            <Text style={{ fontSize: 16, marginVertical: 12 }}>
                                Purchase date:{" "}
                                {datePurchase
                                    ? format(datePurchase, "dd/MM/yyyy")
                                    : product.purchaseDate}
                            </Text>
                            <DatePicker getDate={setDatePurchase} />
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginBottom: 12,
                            }}
                        >
                            <Text style={{ fontSize: 16, marginVertical: 12 }}>
                                Expired date:{" "}
                                {dateExpired
                                    ? format(dateExpired, "dd/MM/yyyy")
                                    : product.expireDate}
                            </Text>
                            <DatePicker getDate={setDateExpired} />
                        </View>
                        <SelectList
                            setSelected={(val) => setClassification(val)}
                            data={classificationData}
                            save="value"
                            onSelect={() => console.log(classification)}
                            placeholder="Classification"
                            defaultOption={classificationData.find(
                                (item) => item.value === product.categories
                            )}
                        />
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginTop: 24,
                            }}
                        >
                            <Text style={{ fontSize: 16, marginVertical: 12 }}>
                                Notification best before:
                            </Text>
                            <Input
                                onChangeText={handleBestBeforeDay}
                                value={bestBeforeDay}
                                maxLength={10}
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                marginVertical: 24,
                            }}
                        >
                            <Text style={{ fontSize: 16, marginVertical: 12 }}>
                                Add favorite:
                            </Text>
                            <TouchableOpacity
                                style={{
                                    padding: 10,
                                }}
                                onPress={handleFavorite}
                            >
                                {favorite ? (
                                    <Icon name="heart" type="antdesign" />
                                ) : (
                                    <Icon name="hearto" type="antdesign" />
                                )}
                            </TouchableOpacity>
                        </View>
                        <Button
                            title="Update"
                            buttonStyle={{
                                backgroundColor: "rgba(39, 39, 39, 1)",
                            }}
                            containerStyle={{
                                marginVertical: 5,
                            }}
                            titleStyle={{
                                color: "white",
                                marginHorizontal: 20,
                            }}
                            onPress={handleUpdate}
                        />
                        <Button
                            title="Delete"
                            buttonStyle={{
                                backgroundColor: "rgba(39, 39, 39, 1)",
                            }}
                            containerStyle={{
                                marginVertical: 5,
                            }}
                            titleStyle={{
                                color: "white",
                                marginHorizontal: 20,
                            }}
                            onPress={handleDeleteProduct}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: { flex: 1, height: Device.height },
    image: {
        maxWidth: Device.width,
        resizeMode: "cover",
        height: 360,
    },
    container: {
        paddingHorizontal: 16,
        paddingVertical: 24,
    },
    iconContainer: {
        flexDirection: "row",
    },
    icon: {
        marginRight: 20,
    },
});

export default ProductDetailScreen;
