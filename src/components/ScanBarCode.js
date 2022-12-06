import React, { useState, useEffect } from "react";
import { Button, Text, View, StyleSheet, Vibration, Alert } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";

import axiosClient from "../services/axiosClient";
import { useNavigation } from "@react-navigation/native";

function ScanBarCode() {
    const [hasPermission, setHasPermission] = useState(false);
    const [scanned, setScanned] = useState(false);

    const navigation = useNavigation();

    useEffect(() => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status === "granted");
        })();
    }, []);

    const handleBarCodeScanned = async ({ _, data }) => {
        setScanned(true);
        Vibration.vibrate();

        if (data) {
            try {
                const { data: products } = await axiosClient.get(
                    `product-bases?populate=image&filters[code][$eq]=${data}`
                );
                if (products.data.length) {
                    const product = products.data[0];
                    const productScan = {
                        expireDate: product.attributes.expireDate,
                        name: product.attributes.name,
                        image: product.attributes.image.data.attributes.url,
                    };

                    navigation.navigate("AddNewProductStack", {
                        screen: "AddNewProduct",
                        params: {
                            productScan,
                        },
                    });
                } else {
                    Alert.alert("Not found product with ", data);
                }
            } catch (error) {
                console.log("handleBarCodeScanned");
                console.log(error);
            }
        } else {
            Alert.alert("Error scan !");
        }
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
