import React from "react";
import {
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView,
    SafeAreaView,
    Alert,
} from "react-native";
import { Icon, Input, Button } from "react-native-elements";
import { SelectList } from "react-native-dropdown-select-list";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { format } from "date-fns";

import { ImageProductDefault } from "../components/Image";
import { classificationData } from "../constants/classifications";
import { Device } from "../styles/values";
import { selectAuth } from "../app/slices/auth";
import { toggleLoading } from "../app/slices/loading";
import DatePicker from "../components/DatePicker";
import axiosClient from "../services/axiosClient";

// @TODO: validate
function AddProductSreen() {
    const [image, setImage] = React.useState(null);
    const [file, setFile] = React.useState({});
    const [classification, setClassification] = React.useState([]);
    const [datePurchase, setDatePurchase] = React.useState("");
    const [dateExpired, setDateExpired] = React.useState("");
    const [nameProduct, setNameProduct] = React.useState("");
    const [bestBeforeDay, setBestBeforeDay] = React.useState("0");

    const { auth } = useSelector(selectAuth);
    const dispatch = useDispatch();
    const navigation = useNavigation();

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

    const handleBestBeforeDay = (value) => {
        const day = value.replace(/[^0-9]/g, "");
        setBestBeforeDay(day);
    };

    const handleReset = () => {
        setDatePurchase("");
        setDateExpired("");
        setNameProduct("");
        setImage(null);
        setBestBeforeDay("0");
    };

    const handleAddNewProduct = async () => {
        dispatch(toggleLoading(true));
        try {
            const data = {};
            data["name"] = nameProduct;
            data["expireDate"] = format(dateExpired, "yyyy-MM-dd");
            data["purchaseDate"] = format(datePurchase, "yyyy-MM-dd");
            data["bestBeforeDay"] = Number(bestBeforeDay);
            data["classification"] = classification;
            data["userId"] = auth.id;

            const formdata = new FormData();
            formdata.append("data", JSON.stringify(data));
            formdata.append("files.image", file);
            const res = await axiosClient.post("products", formdata, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.status === 200) {
                data["image"] = image;
                navigation.navigate("HistoryStack", {
                    screen: "Product",
                    params: {
                        product: data,
                    },
                });
                handleReset();
            }
        } catch (error) {
            dispatch(toggleLoading(false));
            console.log("error", error);
            Alert.alert("Add  product error !");
        }
        dispatch(toggleLoading(false));
    };

    return (
        <View style={styles.wrapper}>
            <SafeAreaView>
                <ScrollView>
                    <Image
                        style={styles.image}
                        source={image ? { uri: image } : ImageProductDefault}
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
                                {datePurchase
                                    ? format(datePurchase, "dd/MM/yyyy")
                                    : ""}
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
                                    : ""}
                            </Text>
                            <DatePicker getDate={setDateExpired} />
                        </View>
                        <SelectList
                            setSelected={(val) => setClassification(val)}
                            data={classificationData}
                            save="value"
                            onSelect={() => console.log(classification)}
                            placeholder="Classification"
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
                        <Button
                            title="Reset"
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
                            onPress={handleReset}
                        />
                        <Button
                            title="Add Product"
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
                            onPress={handleAddNewProduct}
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

export default AddProductSreen;
