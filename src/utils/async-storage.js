import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.error(`error saving the product in history: ${error}`);
    }
};

export const getData = async (key) => {
    try {
        const data = await AsyncStorage.getItem(key);
        return data;
    } catch (error) {
        console.error(`error when getting products ids: ${error}`);
        return null;
    }
};
