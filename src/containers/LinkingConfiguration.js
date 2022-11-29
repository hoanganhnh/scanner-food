import * as Linking from "expo-linking";

const LinkingConfiguration = {
    prefixes: [Linking.createURL("com.hoanganh.bestbefore://app")],
    config: {
        screens: {
            Root: {
                screens: {
                    HistoryRoot: {
                        screens: {
                            Product: "product/:id",
                            History: "history",
                        },
                    },
                },
            },
            RegisterScreen: "register",
        },
    },
};

export default LinkingConfiguration;
