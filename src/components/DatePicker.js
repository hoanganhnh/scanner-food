import React, { useState } from "react";
import { View } from "react-native";
import { Icon } from "react-native-elements";
import DateTimePickerModal from "react-native-modal-datetime-picker";

function DatePicker({ getDate, mode = "date" }) {
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        getDate(date);
        hideDatePicker();
    };

    return (
        <View>
            <Icon
                name="calendar"
                type="font-awesome"
                size={30}
                onPress={showDatePicker}
            />
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode={mode}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
            />
        </View>
    );
}

export default DatePicker;
