import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
    Entypo,
    MaterialCommunityIcons,
    MaterialIcons,
    SimpleLineIcons,
} from "@expo/vector-icons";

import { productDefaults } from "../../styles/ProductDefaults";

function Defaults({ route }) {
    const { nutriments } = route.params.item;
    return (
        <View>
            {nutriments.sugars >= 18 && (
                <View style={productDefaults.allNutriments}>
                    <MaterialCommunityIcons
                        name={"cube-outline"}
                        size={20}
                        color="#787878"
                        style={styles.icons}
                    />
                    <View style={productDefaults.nutrimentsNote}>
                        <Text style={productDefaults.nutriments}> Sucres</Text>

                        <Text style={productDefaults.nutrimentsNoteText}>
                            {nutriments.sugars >= 18 && nutriments.sugars <= 31
                                ? "A little too sweet"
                                : "Too sweet"}
                        </Text>
                    </View>

                    <View style={productDefaults.nutrimentsDot}>
                        <Text style={productDefaults.valueNutrimentsText}>
                            {nutriments.sugars >= 18 && nutriments.sugars} g
                        </Text>
                        <Text>
                            {nutriments.sugars <= 31 ? (
                                <Entypo
                                    name={"dot-single"}
                                    size={40}
                                    color="#F57D1E"
                                />
                            ) : (
                                <Entypo
                                    name={"dot-single"}
                                    size={40}
                                    color="#EF3923"
                                />
                            )}
                        </Text>
                    </View>
                </View>
            )}

            {nutriments.saturated_fat >= 4 && (
                <View style={productDefaults.allNutriments}>
                    <SimpleLineIcons
                        name={"drop"}
                        size={20}
                        color="#787878"
                        style={styles.icons}
                    />

                    <View style={productDefaults.nutrimentsNote}>
                        <Text style={productDefaults.nutriments}>
                            {" "}
                            Saturated fats
                        </Text>
                        <Text style={productDefaults.nutrimentsNoteText}>
                            {nutriments.saturated_fat >= 4 &&
                            nutriments.saturated_fat >= 7
                                ? "Un peu trop gras"
                                : "Trop gras"}
                        </Text>
                    </View>
                    <View style={productDefaults.nutrimentsDot}>
                        <Text style={productDefaults.valueNutrimentsText}>
                            {nutriments.saturated_fat >= 4 &&
                                nutriments.saturated_fat}{" "}
                            g
                        </Text>
                        <Text>
                            {nutriments.saturated_fat <= 7 ? (
                                <Entypo
                                    name={"dot-single"}
                                    size={40}
                                    color="#F57D1E"
                                />
                            ) : (
                                <Entypo
                                    name={"dot-single"}
                                    size={40}
                                    color="#EF3923"
                                />
                            )}
                        </Text>
                    </View>
                </View>
            )}

            {nutriments.salt_value >= 0.92 && (
                <View style={productDefaults.allNutriments}>
                    <MaterialIcons
                        name={"grain"}
                        size={20}
                        color="#787878"
                        style={productDefaults.icons}
                    />
                    <Text style={productDefaults.nutriments}>Sel :</Text>
                    <Text style={{ paddingTop: 20 }}>
                        {nutriments.salt_value >= 0.92 && 1.62
                            ? "A little too salty"
                            : "Too salty"}
                    </Text>
                    <Text style={productDefaults.nutrimentsDot}>
                        {nutriments.salt_value <= 0.92 && nutriments.salt_value}
                        {nutriments.salt_value} g
                    </Text>
                    <View style={productDefaults.nutrimentsDot}>
                        <Text>
                            {nutriments.salt_value <= 0.92 ? (
                                <Entypo
                                    name={"dot-single"}
                                    size={40}
                                    color="#F57D1E"
                                />
                            ) : (
                                <Entypo
                                    name={"dot-single"}
                                    size={40}
                                    color="#EF3923"
                                />
                            )}
                        </Text>
                    </View>
                </View>
            )}

            {nutriments["energy-kcal_value"] >= 360 && (
                <View style={productDefaults.allNutriments}>
                    <MaterialCommunityIcons
                        name={"fire"}
                        size={20}
                        color="#787878"
                        style={productDefaults.icons}
                    />

                    <View style={productDefaults.nutrimentsNote}>
                        <Text style={productDefaults.nutriments}>Calories</Text>
                        <Text style={productDefaults.nutrimentsNoteText}>
                            {
                                (nutriments["energy-kcal_value"] =
                                    360 &&
                                    nutriments["energy - kcal_value"] <= 560
                                        ? "A little too caloric"
                                        : "Too caloric")
                            }
                        </Text>
                    </View>
                    <View style={productDefaults.nutrimentsDot}>
                        <Text style={productDefaults.valueNutrimentsText}>
                            {nutriments["energy-kcal_value"] >= 360 &&
                                nutriments["energy - kcal_value"] <= 560}
                            kCal
                        </Text>
                        <Text style={productDefaults.nutrimentsNoteText}>
                            {nutriments["energy-kcal_value"] <= 560 ? (
                                <Entypo
                                    name={"dot-single"}
                                    size={40}
                                    color="#F57D1E"
                                />
                            ) : (
                                <Entypo
                                    name={"dot-single"}
                                    size={40}
                                    color="#EF3923"
                                />
                            )}
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({});

export default Defaults;
