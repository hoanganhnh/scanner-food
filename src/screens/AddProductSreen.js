import React from "react";
import {
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView,
    SafeAreaView,
    Alert,
    LogBox,
} from "react-native";
import { Icon, Input, Button } from "react-native-elements";
import { SelectList } from "react-native-dropdown-select-list";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
    differenceInSeconds,
    format,
    isAfter,
    isBefore,
    isToday,
} from "date-fns";

import { ImageProductDefault } from "../components/Image";
import { classificationData } from "../constants/classifications";
import { Device } from "../styles/values";
import { selectAuth } from "../app/slices/auth";
import { toggleLoading } from "../app/slices/loading";
import DatePicker from "../components/DatePicker";
import axiosClient from "../services/axiosClient";
import CameraExpo from "../components/CameraExpo";
import LabelColorItem from "../components/LabelColorItem";
import { LABELS } from "../constants/label";

LogBox.ignoreLogs([
    "Non-serializable values were found in the navigation state",
]);

function AddProductSreen() {
    let route = useRoute();

    // TODO: test this
    const { productScan } = route?.params || {};

    const [image, setImage] = React.useState(productScan?.image || "");
    const [file, setFile] = React.useState({});
    const [classification, setClassification] = React.useState("");
    const [purchaseDate, setPurchaseDate] = React.useState("");
    const [expireDate, setExpireDate] = React.useState(
        productScan?.expireDate ? new Date(productScan?.expireDate) : ""
    );
    const [nameProduct, setNameProduct] = React.useState(
        productScan?.name || ""
    );
    const [bestBeforeDay, setBestBeforeDay] = React.useState("");
    const [label, setLabel] = React.useState("");

    const [showCamera, setShowCamera] = React.useState(false);

    React.useEffect(() => {
        if (productScan) {
            if (productScan.image) {
                setImage(productScan.image);
                const file = getImageUpload(productScan.image);
                setFile(file);
            }
            if (productScan.expireDate) {
                setExpireDate(new Date(productScan.expireDate));
            }
            if (productScan.name) {
                setNameProduct(productScan.name);
            }
        }
    }, [productScan]);

    const { auth } = useSelector(selectAuth);
    const dispatch = useDispatch();
    const navigation = useNavigation();

    const getImageUpload = (localUri) => {
        if (!localUri) return;
        const filename = localUri.split("/").pop();
        // Infer the type of the image
        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : `image`;
        return { uri: localUri, name: filename, type };
    };

    const pickImage = async () => {
        try {
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });
            if (!result.canceled) {
                const file = getImageUpload(result.uri);
                setFile(file);
                setImage(result.uri);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handleChangeNameProduct = (value) => {
        setNameProduct(value);
    };

    const handleReset = () => {
        setPurchaseDate("");
        setExpireDate("");
        setNameProduct("");
        setBestBeforeDay("");
        setImage(null);
    };

    const handleAddNewProduct = async () => {
        try {
            if (!file?.uri) {
                Alert.alert("Image is require!");
                return;
            }
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
            const data = {};
            data["name"] = nameProduct;
            data["expireDate"] = format(expireDate, "yyyy-MM-dd");
            data["purchaseDate"] = format(purchaseDate, "yyyy-MM-dd");
            data["bestBeforeDay"] = format(bestBeforeDay, "yyyy-MM-dd");
            data["classification"] = classification;
            data["userId"] = auth.id;
            data["like"] = false;
            data["label"] = label;
            dispatch(toggleLoading(true));

            const formdata = new FormData();
            formdata.append("data", JSON.stringify(data));
            formdata.append("files.image", file);

            const {
                data: {
                    data: { id },
                },
                status,
            } = await axiosClient.post("products", formdata, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "multipart/form-data",
                },
            });

            if (status === 200) {
                data["image"] = image;
                data["id"] = id;
                navigation.navigate("Product", {
                    product: data,
                });
                handleReset();
            }
        } catch (error) {
            dispatch(toggleLoading(false));
            console.log("Add product");
            console.log(error);
            Alert.alert("Add product error !");
        }
        dispatch(toggleLoading(false));
    };

    const onShowCamera = () => {
        setShowCamera(true);
    };

    const getImageFromCamera = (image) => {
        if (image) {
            const file = getImageUpload(image.uri);
            setFile(file);
            setImage(image.uri);
            offCamera();
        }
    };

    const offCamera = () => {
        setShowCamera(false);
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
                                    onPress={onShowCamera}
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
                                    ? format(purchaseDate, "dd/MM/yyyy")
                                    : ""}
                            </Text>
                            <DatePicker getDate={setPurchaseDate} />
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
                                    ? format(expireDate, "dd/MM/yyyy")
                                    : ""}
                            </Text>
                            <DatePicker getDate={setExpireDate} />
                        </View>
                        <SelectList
                            setSelected={(val) => setClassification(val)}
                            data={classificationData}
                            save="value"
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
                                Best before:{" "}
                                {bestBeforeDay
                                    ? format(bestBeforeDay, "dd/MM/yyyy")
                                    : ""}
                            </Text>
                            <DatePicker
                                getDate={setBestBeforeDay}
                                mode="date"
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
                {showCamera && (
                    <CameraExpo
                        getImageFromCamera={getImageFromCamera}
                        offCamera={offCamera}
                    />
                )}
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
