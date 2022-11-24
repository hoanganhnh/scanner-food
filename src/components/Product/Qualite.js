import React from "react";
import { Text, View } from "react-native";
import {
    Entypo,
    MaterialCommunityIcons,
    MaterialIcons,
    SimpleLineIcons,
} from "@expo/vector-icons";
import { productDefaults } from "../../styles/ProductDefaults";

function Qualite({ route }) {
    const { nutriments } = route.params.item;

    return (
        <View>
            <View style={productDefaults.allNutriments}>
                <MaterialCommunityIcons
                    name={"corn"}
                    size={20}
                    color="#787878"
                    style={productDefaults.icons}
                />

                <View style={productDefaults.nutrimentsNote}>
                    <Text style={productDefaults.nutriments}>Fibers</Text>
                    <Text style={productDefaults.nutrimentsNoteText}>
                        {nutriments.fiber <= 3.5
                            ? "Some fibers"
                            : "Excellent amount of fiber"}
                    </Text>
                </View>
                <View style={productDefaults.nutrimentsDot}>
                    <Text style={productDefaults.valueNutrimentsText}>
                        {nutriments.fiber >= 0 && nutriments.fiber}g
                    </Text>
                    <Text>
                        {nutriments.fiber <= 3.5 ? (
                            <Entypo
                                name={"dot-single"}
                                size={40}
                                color="#2ECC71"
                            />
                        ) : (
                            <Entypo
                                name={"dot-single"}
                                size={40}
                                color="#209E53"
                            />
                        )}
                    </Text>
                </View>
            </View>

            <View style={productDefaults.allNutriments}>
                <MaterialCommunityIcons
                    name={"fish"}
                    size={20}
                    color="#787878"
                    style={productDefaults.icons}
                />

                <View style={productDefaults.nutrimentsNote}>
                    <Text style={productDefaults.nutriments}>Proteins</Text>
                    <Text style={productDefaults.nutrimentsNoteText}>
                        {nutriments.proteins <= 8
                            ? "Some proteins"
                            : "Excellent amount of protein"}
                    </Text>
                </View>
                <View style={productDefaults.nutrimentsDot}>
                    <Text style={productDefaults.valueNutrimentsText}>
                        {nutriments.proteins >= 0 && nutriments.proteins}g
                    </Text>
                    <Text>
                        {nutriments.proteins <= 8 ? (
                            <Entypo
                                name={"dot-single"}
                                size={40}
                                color="#2ECC71"
                            />
                        ) : (
                            <Entypo
                                name={"dot-single"}
                                size={40}
                                color="#209E53"
                            />
                        )}
                    </Text>
                </View>
            </View>

            {nutriments.sugars <= 18 && (
                <View style={productDefaults.allNutriments}>
                    <MaterialCommunityIcons
                        name={"cube-outline"}
                        size={20}
                        color="#787878"
                        style={productDefaults.icons}
                    />
                    <View style={productDefaults.nutrimentsNote}>
                        <Text style={productDefaults.nutriments}>Sugars</Text>
                        <Text style={productDefaults.nutrimentsNoteText}>
                            {nutriments.sugars === 0 && nutriments.sugars <= 18
                                ? "No sugar"
                                : "Little sugar"}
                        </Text>
                    </View>

                    <View style={productDefaults.nutrimentsDot}>
                        <Text style={productDefaults.valueNutrimentsText}>
                            {nutriments.sugars <= 18 && nutriments.sugars} g
                        </Text>
                        <Text>
                            {nutriments.sugars <= 18 ? (
                                <Entypo
                                    name={"dot-single"}
                                    size={40}
                                    color="#2ECC71"
                                />
                            ) : (
                                <Entypo
                                    name={"dot-single"}
                                    size={40}
                                    color="#209E53"
                                />
                            )}
                        </Text>
                    </View>
                </View>
            )}

            {nutriments.saturated_fat <= 4 && (
                <View style={productDefaults.allNutriments}>
                    <SimpleLineIcons
                        name={"drop"}
                        size={20}
                        color="#787878"
                        style={productDefaults.icons}
                    />
                    <View style={productDefaults.nutrimentsNote}>
                        <Text style={productDefaults.nutriments}>
                            {" "}
                            Saturated fats
                        </Text>
                        <Text style={productDefaults.nutrimentsNoteText}>
                            {nutriments.saturated_fat === 0 &&
                            nutriments.saturated_fat >= 1
                                ? "No saturated fats"
                                : "Faible impact"}
                        </Text>
                    </View>

                    <View style={productDefaults.nutrimentsDot}>
                        <Text style={productDefaults.valueNutrimentsText}>
                            {nutriments.saturated_fat <= 4 &&
                                nutriments.saturated_fat}{" "}
                            g
                        </Text>
                        <Text>
                            {nutriments.saturated_fat <= 4 ? (
                                <Entypo
                                    name={"dot-single"}
                                    size={40}
                                    color="#2ECC71"
                                />
                            ) : (
                                <Entypo
                                    name={"dot-single"}
                                    size={40}
                                    color="#209E53"
                                />
                            )}
                        </Text>
                    </View>
                </View>
            )}

            {nutriments.salt_value <= 0.92 && (
                <View style={productDefaults.allNutriments}>
                    <MaterialIcons
                        name={"grain"}
                        size={20}
                        color="#787878"
                        style={productDefaults.icons}
                    />
                    <View style={productDefaults.nutrimentsNote}>
                        <Text style={productDefaults.nutriments}>Sel</Text>
                        <Text style={productDefaults.nutrimentsNoteText}>
                            {nutriments.salt_value === 0 &&
                            nutriments.salt_value > 0
                                ? "No salt"
                                : "Low impact"}
                        </Text>
                    </View>
                    <View style={productDefaults.nutrimentsDot}>
                        <Text style={productDefaults.valueNutrimentsText}>
                            {nutriments.salt_value <= 0.92 &&
                                nutriments.salt_value}
                            g
                        </Text>
                        <Text>
                            {nutriments.salt_value <= 0.92 ? (
                                <Entypo
                                    name={"dot-single"}
                                    size={40}
                                    color="#2ECC71"
                                />
                            ) : (
                                <Entypo
                                    name={"dot-single"}
                                    size={40}
                                    color="#209E53"
                                />
                            )}
                        </Text>
                    </View>
                </View>
            )}

            {nutriments["energy - kcal_value"] <= 360 && (
                <View style={productDefaults.allNutriments}>
                    <MaterialCommunityIcons
                        name={"fire"}
                        size={30}
                        color="#787878"
                        style={productDefaults.icons}
                    />

                    <View style={productDefaults.nutrimentsNote}>
                        <Text style={productDefaults.nutriments}>Calories</Text>
                        <Text style={productDefaults.nutrimentsNoteText}>
                            {nutriments["energy - kcal_value"] === 0 &&
                            nutriments["energy - kcal_value"] <= 360
                                ? "No calories"
                                : "Low impact"}
                        </Text>
                    </View>
                    <View style={productDefaults.nutrimentsDot}>
                        <Text style={productDefaults.valueNutrimentsText}>
                            {nutriments["energy - kcal_value"] <= 360 &&
                                nutriments["energy - kcal_value"]}
                            kCal
                        </Text>
                        <Text style={productDefaults.nutrimentsNoteText}>
                            {nutriments["energy - kcal_value"] <= 160 ? (
                                <Entypo
                                    name={"dot-single"}
                                    size={40}
                                    color="#2ECC71"
                                />
                            ) : (
                                <Entypo
                                    name={"dot-single"}
                                    size={40}
                                    color="#209E53"
                                />
                            )}
                        </Text>
                    </View>
                </View>
            )}
        </View>
    );
}

export default Qualite;
