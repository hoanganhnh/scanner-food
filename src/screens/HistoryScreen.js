import React from "react";
import { View, FlatList } from "react-native";
import ListItem from "../components/Listitem";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { globalTextStyle } from "../styles/global";

import { getProductsHistory, clearHistory } from "../utils/database";

class HistoryScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            DATA: [],
            HistoryKeys: [],
            isLoading: false,
        };
    }

    componentDidMount = () => {
        this._isMounted = true;
        this.setState({
            isLoading: true,
        });

        if (this._isMounted) {
            this._unsubscribe = this.props.navigation.addListener(
                "focus",
                () => {
                    this.loadHistory();
                }
            );
        }
    };

    loadHistory = () => {
        getProductsHistory(this.getProductsFromDb);
        this.getScans();
        this.setState({
            isLoading: false,
        });
    };

    componentWillUnmount = () => {
        this._isMounted = false;
        this._unsubscribe();
    };

    getScannedKeys = async () => {
        try {
            const scans = await AsyncStorage.getAllKeys();
            return scans;
        } catch (error) {
            console.error(`error when getting products ids: ${error}`);
        }
    };

    getProductsFromDb = (products) => {
        try {
            products.map((p) => {
                if (!this.state.HistoryKeys.includes(p["id"])) {
                    this.setState({
                        HistoryKeys: [
                            ...this.state.HistoryKeys,
                            JSON.stringify(p["id"]),
                        ],
                    });
                }
            });
        } catch (error) {
            console.error(
                `An error occured when getting products from history: ${error}`
            );
        }
    };

    getScans = async () => {
        try {
            this.setState({ DATA: [] });
            let product_keys = await this.getScannedKeys();
            product_keys.map(async (id_product) => {
                let current_item = await AsyncStorage.getItem(id_product);
                // console.log(id_product);
                // console.log(this.state.HistoryKeys);
                // if (this.state.HistoryKeys.includes(id_product)) {
                // }
                this.setState({
                    DATA: [...this.state.DATA, JSON.parse(current_item)],
                });
                // console.log(this.state.DATA);
            });
        } catch (error) {
            console.error(`error when getting products ids: ${error}`);
        }
    };

    resetAllDataComponent = () => {
        clearHistory();
        this.setState({
            HistoryKeys: [],
            DATA: [],
        });
    };

    render() {
        return (
            <View style={globalTextStyle.history}>
                <FlatList
                    data={this.state.DATA}
                    renderItem={({ item }) => (
                        <ListItem
                            item={item}
                            navigation={this.props.navigation}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                />
            </View>
        );
    }
}

export default HistoryScreen;
