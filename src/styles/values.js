import { Dimensions, Platform, NativeModules } from "react-native";

const { width, height } = Dimensions.get("window");
const { PlatformConstants } = NativeModules;

export const Device = {
    width,
    height: height,
    isIos: Platform.OS === "ios",
    deviceType: PlatformConstants.interfaceIdiom,
};
