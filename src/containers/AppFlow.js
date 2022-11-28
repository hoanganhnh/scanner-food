import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useSelector } from "react-redux";
import { Icon } from "react-native-elements";

import ScanBarCode from "../components/ScanBarCode";
import HomeScreen from "../screens/HomeScreen";
import FavoriteScreen from "../screens/FavoriteScreen";
import ForgotPasswordScreen from "../screens/ForgotPasswordScreen";
import LoginSreen from "../screens/LoginSreen";
import RegisterScreen from "../screens/RegisterScreen";
import SettingSreen from "../screens/SettingSreen";
import ProfileSreen from "../screens/ProfileSreen";
import AddProductSreen from "../screens/AddProductSreen";
import HistorycalScreen from "../screens/HistorycalScreen";
import ProductDetailScreen from "../screens/ProductDetailScreen";
import { isAuthenticated } from "../app/slices/auth";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
    );
}

function HistoryStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="History" component={HistorycalScreen} />
            <Stack.Screen name="Product" component={ProductDetailScreen} />
        </Stack.Navigator>
    );
}

function SettingStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Seeting" component={SettingSreen} />
            <Stack.Screen name="Favorite" component={FavoriteScreen} />
            <Stack.Screen name="ProfileSreen" component={ProfileSreen} />
        </Stack.Navigator>
    );
}

function AddNewProductStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Add New Product" component={AddProductSreen} />
        </Stack.Navigator>
    );
}

function Home() {
    return (
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
                    tabBarIcon: () => <Icon name="barcode" type="antdesign" />,
                }}
            />
            <Tab.Screen
                name="AddNewProductStack"
                component={AddNewProductStack}
                options={{
                    tabBarLabel: "Add",
                    tabBarIcon: () => <Icon name="plus" type="antdesign" />,
                }}
            />
            <Tab.Screen
                name="HistoryStack"
                component={HistoryStack}
                options={{
                    tabBarLabel: "Historical",
                    tabBarIcon: () => (
                        <Icon name="filetext1" type="antdesign" />
                    ),
                }}
            />
            <Tab.Screen
                name="Setting"
                component={SettingStack}
                options={{
                    tabBarIcon: () => <Icon name="setting" type="antdesign" />,
                }}
            />
        </Tab.Navigator>
    );
}

export default function AppFlow() {
    const isLogin = useSelector(isAuthenticated);
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {isLogin ? (
                <Stack.Group>
                    <Stack.Screen
                        options={{ headerShown: false }}
                        name="Home"
                        component={Home}
                    />
                </Stack.Group>
            ) : (
                <Stack.Group>
                    <Stack.Screen name="LoginSreen" component={LoginSreen} />
                    <Stack.Screen
                        name="RegisterScreen"
                        component={RegisterScreen}
                    />
                    <Stack.Screen
                        name="ForgotPasswordScreen"
                        component={ForgotPasswordScreen}
                    />
                </Stack.Group>
            )}
        </Stack.Navigator>
    );
}
