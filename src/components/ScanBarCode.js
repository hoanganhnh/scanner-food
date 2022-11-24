import React, { useState, useEffect } from "react";
import { Button, Text, View, StyleSheet, Vibration } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { insertProduct } from "../utils/database";

function ScanBarCode({ navigation }) {
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    const saveProduct = async (id_product, api_res) => {
        try {
            insertProduct(id_product.toString(), true, false);
            storeData(api_res.product._id, JSON.stringify(api_res.product));
        } catch (error) {
            console.error(`error saving the product in history: ${error}`);
        }
    };

    const storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            console.error(`error saving the product in history: ${error}`);
        }
    };

    const handleBarCodeScanned = ({ _, data }) => {
        setScanned(true);
        Vibration.vibrate();

        fetch(`https://world.openfoodfacts.org/api/v0/product/${data}.json`)
            .then((response) => response.json())
            .then((json) => {
                if (json.status_verbose === "product found") {
                    saveProduct(json.product._id, json);
                    navigation.navigate("Product", {
                        item: json.product,
                    });
                } else {
                    alert("Product not found");
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };

    if (hasPermission === null) {
        return <Text>Requesting for camera permission</Text>;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View
            style={{
                flex: 1,
                flexDirection: "column",
                justifyContent: "flex-end",
            }}
        >
            <BarCodeScanner
                onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                style={StyleSheet.absoluteFillObject}
            />

            {scanned && (
                <Button
                    title={"Scan your code"}
                    onPress={() => setScanned(false)}
                />
            )}
        </View>
    );
}

export default ScanBarCode;
