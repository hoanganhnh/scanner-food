import React from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Switch,
    TouchableOpacity,
    Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Button, Input } from "react-native-elements";
import { Icon } from "react-native-elements";
import moment from "moment/moment";

import DatePicker from "../components/DatePicker";
import useAsyncStorage from "../hooks/useAsyncStorage";
import { scheduleNotification } from "../utils/notification";

const ALARM = "ALARM";

function AlarmScreen() {
    const [time, setTime] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [alarms, setAlarms] = React.useState([]);

    const { getStoredItem, saveItemInStorage, removeStoredItem } =
        useAsyncStorage();

    React.useEffect(() => {
        getAlarmInStore();
    }, []);

    const getAlarmInStore = async () => {
        try {
            const currentAlarms = (await getStoredItem(ALARM)) || [];
            setAlarms(currentAlarms);
        } catch (error) {
            console.log("getAlarmInStore");
            console.log(error);
        }
    };

    const saveAlarmInStore = async (alarms) => {
        await saveItemInStorage(ALARM, alarms);
    };

    const resetAll = () => {
        setTitle("");
        setTime("");
    };

    const handleAddNewAlarm = async () => {
        if (!title) {
            Alert.alert("Note is require");
            return;
        }
        if (!time) {
            Alert.alert("Time alarm is require");
            return;
        }
        const newAlarm = {
            id: Date.now(),
            title: title,
            time: time,
            isNotification: false,
        };
        const updatedAlarms = [newAlarm, ...alarms];
        setAlarms(updatedAlarms);
        await saveAlarmInStore(updatedAlarms);
        resetAll();
    };

    const getTime = async (currentTime) => {
        // console.log("currentTime", currentTime);
        // setTime(moment(new Date(currentTime)).format("hh:mm A"));
        setTime(currentTime);
        // await scheduleAndCancel(currentTime);
    };

    const handleChangeTitle = (text) => {
        setTitle(text);
    };

    const onChangeNotification = async (id) => {
        const newAlarms = [...alarms];
        const idx = newAlarms.findIndex((item) => item.id === id);
        const currentAlarm = newAlarms[idx];
        const date = currentAlarm.time;

        if (currentAlarm.isNotification) {
            currentAlarm.isNotification = false;
        } else {
            currentAlarm.isNotification = true;
            await scheduleNotification({
                date: date.toString(),
                title: "Notification",
                body: currentAlarm.title,
            });
        }
        newAlarms.splice(idx, 1, currentAlarm);
        setAlarms(newAlarms);
        await saveAlarmInStore(newAlarms);
    };

    const deleteOneAlarm = async (id) => {
        const newAlarms = [...alarms].filter((alarm) => alarm.id !== id);
        setAlarms(newAlarms);
        await saveAlarmInStore(newAlarms);
    };

    const handleRemoveAllAlarm = async () => {
        setAlarms([]);
        await removeStoredItem(ALARM);
    };
    // TODO: update only hours in my alams
    // console.log(moment(new Date("2022-12-14T14:10:00.000Z")).format("hh:mm A"));
    // console.log(moment.utc("09:10 PM", "hh:mm A").toISOString());

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={{ paddingHorizontal: 24 }}>
                <Input
                    value={title}
                    onChangeText={handleChangeTitle}
                    placeholder="Note something..."
                />
                <View style={styles.timeAlarm}>
                    <Text style={{ fontSize: 16 }}>
                        Time alram:{" "}
                        {time &&
                            moment(new Date(time)).format("DD/MM/YYYY hh:mm A")}
                    </Text>
                    <DatePicker mode="datetime" getDate={getTime} />
                </View>
                <Button
                    icon={<AntDesign name="plus" color="#fff" size={24} />}
                    onPress={handleAddNewAlarm}
                />
                <View style={styles.list}>
                    {alarms.map((alarm) => {
                        return (
                            <View style={styles.item} key={alarm.id}>
                                <Text style={styles.heading}>
                                    {alarm.title}
                                </Text>
                                <View style={styles.time}>
                                    <Text>
                                        {moment(new Date(alarm.time)).format(
                                            "DD/MM/YYYY hh:mm A"
                                        )}
                                    </Text>
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Switch
                                            value={alarm.isNotification}
                                            onChange={() =>
                                                onChangeNotification(alarm.id)
                                            }
                                            style={{ marginRight: 16 }}
                                        />
                                        <TouchableOpacity
                                            onPress={() =>
                                                deleteOneAlarm(alarm.id)
                                            }
                                        >
                                            <Icon
                                                name="delete"
                                                type="ant-design"
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        );
                    })}
                </View>
                {alarms.length > 0 && (
                    <Button
                        title="Remove all"
                        buttonStyle={{
                            backgroundColor: "black",
                            borderWidth: 2,
                            borderColor: "white",
                            borderRadius: 30,
                        }}
                        containerStyle={{
                            marginHorizontal: 20,
                            marginVertical: 24,
                        }}
                        titleStyle={{ fontWeight: "bold" }}
                        onPress={handleRemoveAllAlarm}
                    />
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 25,
    },
    timeAlarm: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginVertical: 12,
        paddingHorizontal: 6,
    },
    list: {
        marginTop: 24,
        marginBottom: 24,
    },
    item: {
        borderBottomWidth: 1,
        borderColor: "#ddd",
        marginTop: 8,
        paddingBottom: 8,
    },
    heading: {
        fontSize: 20,
    },
    time: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
});

export default AlarmScreen;
