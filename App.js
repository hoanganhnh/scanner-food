import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { Icon } from "react-native-elements";

import HomeScreen from "./src/screens/HomeScreen";
import HistoryScreen from "./src/screens/HistoryScreen";
import FavoriteScreen from "./src/screens/FavoriteScreen";
import ProductScreen from "./src/screens/ProductScreen";
import ScanBarCode from "./src/components/ScanBarCode";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Accueil" component={HomeScreen} />
            <Stack.Screen name="Product" component={ProductScreen} />
        </Stack.Navigator>
    );
}

function HistoryStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Historique" component={HistoryScreen} />
        </Stack.Navigator>
    );
}

function FavoritesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Favoris" component={FavoriteScreen} />
        </Stack.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="Main"
                    component={HomeStack}
                    options={{
                        tabBarLabel: "Home",
                        tabBarIcon: () => <Icon name="home" type="ionicons" />,
                    }}
                />
                <Tab.Screen
                    name="Scan"
                    component={ScanBarCode}
                    options={{
                        tabBarLabel: "Scanner",
                        tabBarIcon: () => (
                            <Icon name="barcode" type="antdesign" />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Favorites"
                    component={FavoritesStack}
                    options={{
                        tabBarLabel: "Favorites",
                        tabBarIcon: () => (
                            <Icon name="heart" type="antdesign" />
                        ),
                    }}
                />
                <Tab.Screen
                    name="History"
                    component={HistoryStack}
                    options={{
                        tabBarLabel: "Historical",
                        tabBarIcon: () => (
                            <Icon name="filetext1" type="antdesign" />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
