import React from "react";
import {
    Text,
    View,
    StyleSheet,
    Image,
    ScrollView,
    SafeAreaView,
    Button,
    Switch,
} from "react-native";
import { Icon, Input } from "react-native-elements";
import { SelectList } from "react-native-dropdown-select-list";
import * as ImagePicker from "expo-image-picker";
import { format } from "date-fns";

import { ImageProductDefault } from "../components/Image";
import { Device } from "../styles/values";
import DatePicker from "../components/DatePicker";

const classificationData = [
    { key: "1", value: "Fruits" },
    { key: "2", value: "Vegetables" },
    { key: "3", value: "Graints" },
    { key: "4", value: "Protetin Foods" },
    { key: "6", value: "Diary Products" },
    { key: "7", value: "Drinks" },
];

function AddProductSreen() {
    const [image, setImage] = React.useState(null);
    const [classification, setClassification] = React.useState([]);
    const [datePurchase, setDatePurchase] = React.useState("");
    const [dateExpired, setDateExpired] = React.useState("");
    const [nameProduct, setNameProduct] = React.useState("");
    const [isNotification, setIsNotification] = React.useState(false);

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

    const handleChangeNotification = () => {
        setIsNotification(!isNotification);
    };

    const handleReset = () => {
        setDatePurchase("");
        setDateExpired("");
        setNameProduct("");
        setIsNotification(false);
        setImage(null);
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
                                Notification:
                            </Text>
                            <Switch
                                value={isNotification}
                                onChange={handleChangeNotification}
                            />
                        </View>
                        <Button title="Reset" onPress={handleReset} />
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
