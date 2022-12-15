import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";

import store from "./src/app/store";
import AppFlow from "./src/containers/AppFlow";
import { LoadingModal } from "./src/components/LoadingModal";
import AppProvider from "./src/contexts/app-provider";

export default function App() {
    return (
        <Provider store={store}>
            <NavigationContainer>
                <AppProvider>
                    <AppFlow />
                </AppProvider>
            </NavigationContainer>
            <LoadingModal />
        </Provider>
    );
}
