import React from "react";
import { View } from "react-native";
import { Text } from "react-native-elements";

function Autre({ route }) {
    const { additives_tags, allergens } = route.params.item;
    return (
        <View style={{ alignItems: "center" }}>
            <Text
                style={{
                    padding: 20,
                }}
                h2
            >
                Additives:
            </Text>
            {additives_tags && additives_tags.length > 0 ? (
                additives_tags.map((additif, id) => (
                    <Text key={id} style={{ fontSize: 16, paddingBottom: 10 }}>
                        {additif}
                    </Text>
                ))
            ) : (
                <Text h4 style={{ fontSize: 16, padding: 24 }}>
                    N/A
                </Text>
            )}

            <Text style={{ paddingBottom: 60 }} h2>
                Allergens:
            </Text>
            <Text style={{ fontSize: 16 }} h4>
                {allergens ? allergens : "N/A"}
            </Text>
        </View>
    );
}

export default Autre;
