import React from "react";
import { View, Image, Text } from "react-native";

import { globalStyles, globalTextStyle } from "../styles/global";
import { initDatabase } from "../utils/database";

class HomeScreen extends React.Component {
    constructor(props) {
        super(props);

        initDatabase();
        this.state = {
            DATA: false,
            isLoading: false,
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this.setState({
            isLoading: true,
        });

        this.setState({
            isLoading: false,
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <View>
                <View style={{ display: "flex", alignItems: "center" }}>
                    <Image
                        style={globalStyles.photo}
                        source={require("../../assets/Easyscan.png")}
                    />
                </View>
                <Text style={globalTextStyle.welcome}>
                    Welcome to Best Before !
                </Text>
                <Text style={globalTextStyle.description}>
                    Best Before is a 100% standalone application that helps you
                    manage products !
                </Text>
            </View>
        );
    }
}

export default HomeScreen;
