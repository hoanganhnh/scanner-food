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
import { useDispatch, useSelector } from "react-redux";
import {
    differenceInSeconds,
    format,
    isAfter,
    isBefore,
    isToday,
} from "date-fns";

import { Device } from "../styles/values";
import { classificationData } from "../constants/classifications";
import DatePicker from "../components/DatePicker";
import axiosClient from "../services/axiosClient";
import { toggleLoading } from "../app/slices/loading";
import { selectAuth } from "../app/slices/auth";

function ProductDetailScreen({ route, navigation }) {
    const { product } = route.params;

    const [image, setImage] = React.useState(product.image);
    const [file, setFile] = React.useState({});
    const [classification, setClassification] = React.useState(
        product.classification
    );
    const [purchaseDate, setPurchaseDate] = React.useState(
        product.purchaseDate
    );
    const [expireDate, setExpireDate] = React.useState(product.expireDate);
    const [bestBeforeDay, setBestBeforeDay] = React.useState(
        product.bestBeforeDay
    );
    const [nameProduct, setNameProduct] = React.useState(product.name);
    // TODO: handle like product
    const [favorite, setFavorite] = React.useState(false);

    const dispatch = useDispatch();

    const { auth } = useSelector(selectAuth);

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            setFile(result);
            if (!result.canceled) {
                const localUri = result.uri;
                const filename = localUri.split("/").pop();
                // Infer the type of the image
                const match = /\.(\w+)$/.exec(filename);
                const type = match ? `image/${match[1]}` : `image`;
                setFile({ uri: localUri, name: filename, type });
                setImage(result.uri);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangeNameProduct = (value) => {
        setNameProduct(value);
    };

    const handleFavorite = () => {
        setFavorite((state) => !state);
    };

    const handleUpdate = async () => {
        // FIXME: handle update products
        if (!nameProduct) {
            Alert.alert("Name product is require!");
            return;
        }
        if (!purchaseDate) {
            Alert.alert("Purchase date product is require!");
            return;
        }
        if (!expireDate) {
            Alert.alert("Expire date product is require!");
            return;
        }

        if (isToday(expireDate)) {
            Alert.alert("Expire date product must difference today !");
            return;
        }
        const diff = differenceInSeconds(
            new Date(expireDate),
            new Date(purchaseDate)
        );
        if (diff < 0) {
            Alert.alert("Error set time expire date !");
            return;
        }

        if (!bestBeforeDay) {
            Alert.alert("Expire date product is require!");
            return;
        }

        if (isBefore(new Date(bestBeforeDay), new Date(purchaseDate))) {
            Alert.alert("Best before day must after purchase date !");
            return;
        }
        if (isAfter(new Date(bestBeforeDay), new Date(expireDate))) {
            Alert.alert("Best before day must previous expire date !");
            return;
        }

        if (!classification) {
            Alert.alert("Classification product is require!");
            return;
        }

        try {
            const data = {};
            data["name"] = nameProduct;
            data["expireDate"] = expireDate;
            data["purchaseDate"] = purchaseDate;
            data["bestBeforeDay"] = bestBeforeDay;
            data["classification"] = classification;
            data["userId"] = auth.id;
            data["like"] = false;
            dispatch(toggleLoading(true));

            const formdata = new FormData();
            formdata.append("data", JSON.stringify(data));

            if (file?.uri) {
                formdata.append("files.image", file);
            }
            const res = await axiosClient.put(
                `products${product.id}`,
                formdata,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (res.status === 200) {
                Alert.alert("Update product successfull!");
            }
        } catch (error) {
            dispatch(toggleLoading(false));
            console.log("error", error);
            Alert.alert("Update product error !");
        }
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

                            dispatch(toggleLoading(true));
                            if (res.status == 200) {
                                console.log("delete successfull");
                                dispatch(toggleLoading(false));
                                navigation.goBack();
                            }
                        } catch (error) {
                            Alert.alert("Delete product error !");
                            dispatch(toggleLoading(false));
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
        dispatch(toggleLoading(false));
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
                            value={nameProduct}
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
                                {purchaseDate
                                    ? format(
                                          new Date(purchaseDate),
                                          "dd/MM/yyyy"
                                      )
                                    : ""}
                            </Text>
                            <DatePicker getDate={setPurchaseDate} mode="date" />
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
                                {expireDate
                                    ? format(new Date(expireDate), "dd/MM/yyyy")
                                    : ""}
                            </Text>
                            <DatePicker getDate={setExpireDate} mode="date" />
                        </View>
                        <SelectList
                            setSelected={(val) => setClassification(val)}
                            data={classificationData}
                            save="value"
                            onSelect={() => console.log(classification)}
                            placeholder="Classification"
                            defaultOption={classificationData.find(
                                (item) => item.value === product.classification
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
                                Best before:{" "}
                                {bestBeforeDay
                                    ? format(
                                          new Date(bestBeforeDay),
                                          "dd/MM/yyyy"
                                      )
                                    : ""}
                            </Text>
                            <DatePicker
                                getDate={setBestBeforeDay}
                                mode="datetime"
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
