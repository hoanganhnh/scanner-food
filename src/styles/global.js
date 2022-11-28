import { StyleSheet } from "react-native";

export const globalColors = {
    primary: "#073B4C",
    secondary: "#06D6A0",
    error: "#EF476F",
    warning: "#FFD166",
    caption: "#118AB2",
    white: "white",
};

export const scores = {
    green: "green",
    lightgreen: "#85BB2F",
    yellow: "#FFD300",
    orange: "orange",
    red: "red",
};
export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#66b4ff",
        padding: 15,
    },
    center: {
        alignItems: "center",
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 100,
        marginBottom: 10,
    },
    itemListItemContainer: {
        width: "100%",
        paddingTop: 10,
        paddingBottom: 10,
    },
    itemListItemSeparator: {
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    itemListTitle: {
        fontSize: 18,
        paddingTop: 20,
    },
    itemListRating: {
        fontSize: 12,
        color: "#888",
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        borderBottomWidth: 1,
        borderBottomColor: "#1d1d1d",
    },
    photo: {
        width: 300,
        height: 300,
    },
    button: {
        height: 44,
        width: 210,
        justifyContent: "center",
        backgroundColor: "#066D36",
        borderRadius: 15,
    },
    view: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    stretch: {
        width: 100,
        height: 100,
        resizeMode: "stretch",
    },
    productContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 90,
    },
    padding: {
        padding: 30,
    },
    paddingCenter: {
        padding: 30,
        alignItems: "center",
    },
    paddingCenterPetit: {
        padding: 30,
        alignItems: "center",
        fontSize: 16,
    },
});
export const globalTextStyle = {
    header: {
        fontWeight: "bold",
        fontSize: 20,
        color: globalColors.white,
    },

    h1: {
        fontWeight: "bold",
        fontSize: 32,
        color: globalColors.primary,
        marginBottom: 5,
    },
    h2: {
        fontSize: 26,
        color: globalColors.primary,
        marginBottom: 5,
    },
    content: {
        fontSize: 14,
        color: "grey",
        marginBottom: 10,
    },
    subtitle: {
        color: "gray",
        fontSize: 12,
        marginBottom: 15,
    },
    welcome: {
        color: "#000",
        fontWeight: "400",
        fontSize: 30,
        marginTop: 20,
        textAlign: "center",
    },

    description: {
        color: "#000",
        marginTop: 20,
        fontSize: 20,
        textAlign: "center",
        fontWeight: "200",
        paddingLeft: 10,
        paddingRight: 10,
    },
    buttonText: {
        color: "#FFF",
        fontWeight: "bold",
        textAlign: "center",
        fontSize: 20,
    },
    history: {
        flex: 1,
    },
};
