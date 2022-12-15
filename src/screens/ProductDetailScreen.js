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
import { SelectList } from "react-native-dropdown-select-list";
import { useDispatch } from "react-redux";
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
import LabelColorItem from "../components/LabelColorItem";
import { LABELS } from "../constants/label";

function ProductDetailScreen({ route, navigation }) {
    const { product } = route.params;

    // eslint-disable-next-line no-unused-vars
    const [image, setImage] = React.useState(product.image);
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
    const [favorite, setFavorite] = React.useState(product.like);
    const [label, setLabel] = React.useState(() =>
        product.label === null ? "" : product.label
    );

    React.useLayoutEffect(() => {
        if (product.image) {
            setImage(route.params.product.image);
        }
        if (product.classification) {
            setClassification(product.classification);
        }
        if (product.purchaseDate) {
            setPurchaseDate(product.purchaseDate);
        }
        if (product.expireDate) {
            setExpireDate(product.expireDate);
        }
        if (product.bestBeforeDay) {
            setBestBeforeDay(product.bestBeforeDay);
        }

        if (product.name) {
            setNameProduct(product.name);
        }
        if (product.label) {
            setLabel(product.label);
        }
        setFavorite(product.like);
    }, [product]);

    const dispatch = useDispatch();

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
            data["expireDate"] = format(new Date(expireDate), "yyyy-MM-dd");
            data["purchaseDate"] = format(new Date(purchaseDate), "yyyy-MM-dd");
            data["bestBeforeDay"] = format(
                new Date(bestBeforeDay),
                "yyyy-MM-dd"
            );
            data["classification"] = classification;
            data["like"] = favorite;
            data["label"] = label;

            dispatch(toggleLoading(true));

            const res = await axiosClient.put(`products/${product.id}`, {
                data,
            });

            if (res.status === 200) {
                Alert.alert("Update product successfull!");
            }
        } catch (error) {
            dispatch(toggleLoading(false));
            console.log("error update product");
            console.log(error);
            Alert.alert("Update product error !");
        }
        dispatch(toggleLoading(false));
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

    const onChooseLabel = (type) => {
        setLabel(type);
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
                            Name product:
                        </Text>
                        <Input
                            value={nameProduct}
                            onChangeText={handleChangeNameProduct}
                            placeholder="Name product..."
                        />
                        <View style={{}}>
                            <Text style={{ fontSize: 16, marginVertical: 12 }}>
                                Label: {label}
                            </Text>
                            <View style={{ flexDirection: "row" }}>
                                <LabelColorItem
                                    onChooseLabel={() => onChooseLabel("red")}
                                    color={LABELS.red}
                                    style={{ marginRight: 16 }}
                                />
                                <LabelColorItem
                                    onChooseLabel={() => onChooseLabel("blue")}
                                    color={LABELS.blue}
                                    style={{ marginRight: 16 }}
                                />
                                <LabelColorItem
                                    onChooseLabel={() =>
                                        onChooseLabel("yellow")
                                    }
                                    color={LABELS.yellow}
                                />
                            </View>
                        </View>
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
                                mode="date"
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
