import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { Icon } from "react-native-elements";

import { useNotifications } from "../hooks/useNotifications";
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
import LinkingConfiguration from "./LinkingConfiguration";
import AppProvider from "../contexts/app-provider";
import ItemScreen from "../screens/ItemScreen";
import MealScreen from "../screens/MealScreen";
import MealDetailScreen from "../screens/MealDetailScreen";
import NotificationListScreen from "../screens/NotificationListScreen";
import PolicyScreen from "../screens/PolicyScreen";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name="Home"
                component={HomeScreen}
            />
            <Stack.Screen
                name="ItemScreen"
                options={{ title: "Add my Ingredients" }}
                component={ItemScreen}
            />
            <Stack.Screen
                name="MealScreen"
                component={MealScreen}
                options={{ title: "Meals" }}
            />
            <Stack.Screen
                name="MealDetailScreen"
                component={MealDetailScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}

function HistoryStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="History" component={HistorycalScreen} />
            <Stack.Screen
                options={{ headerShown: false }}
                name="Product"
                component={ProductDetailScreen}
            />
        </Stack.Navigator>
    );
}

function SettingStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="SettingScreen"
                component={SettingSreen}
                options={{ title: "Setting" }}
            />
            <Stack.Screen name="Favorites" component={FavoriteScreen} />
            <Stack.Screen
                name="ProfileSreen"
                component={ProfileSreen}
                options={{ title: "My profile" }}
            />
            <Stack.Screen
                name="NotificationList"
                component={NotificationListScreen}
                options={{ title: "Notifications" }}
            />
            <Stack.Screen
                name="PolicyScreen"
                component={PolicyScreen}
                options={{ title: "Privacy Policy" }}
            />
        </Stack.Navigator>
    );
}

function AddNewProductStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                options={{ headerShown: false }}
                name="AddNewProduct"
                component={AddProductSreen}
            />
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
    const { registerForPushNotificationsAsync } = useNotifications();
    React.useEffect(() => {
        registerForPushNotificationsAsync();
    }, []);
    return (
        <AppProvider>
            <NavigationContainer linking={LinkingConfiguration} independent>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    {isLogin ? (
                        <Stack.Group>
                            <Stack.Screen name="Home" component={Home} />
                        </Stack.Group>
                    ) : (
                        <Stack.Group>
                            <Stack.Screen
                                name="LoginSreen"
                                component={LoginSreen}
                            />
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
            </NavigationContainer>
        </AppProvider>
    );
}
