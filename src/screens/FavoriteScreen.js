import React from 'react';
import { View, FlatList } from 'react-native';
import ListItem from '../components/Listitem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProductsFavorites } from '../utils/database'
import { globalTextStyle } from '../styles/global'

class FavoriteScreen extends React.Component {

  constructor(props){
    super(props)

    this.state={
      DATA: [],
      FavoriteKeys: [],
      isLoading: false
    }
  }

  componentDidMount = () => {
    this._isMounted = true;
    this.setState({
      isLoading: true
  })

    if (this._isMounted) {
      this._unsubscribe = this.props.navigation.addListener('focus', () => {
        this.loadFavorites();
      });
    }
  };

  loadFavorites = () => {
    getProductsFavorites(this.getProductsFromDb)
    this.getScans();
    this.setState({
        isLoading: false
    })
  }

  componentWillUnmount = () => {
    this._isMounted = false;
    this._unsubscribe();
  }

	getScannedKeys = async () => {
		try {
			const scans = await AsyncStorage.getAllKeys();
			return scans
		} catch (error) {
      console.error(`error when getting products ids: ${error}`)
		}
  }
  
  getProductsFromDb = (products) => {
    try{
      this.setState({FavoriteKeys:[]})
      products.map(p => {
        if (!this.state.FavoriteKeys.includes(p['id'])){
          this.setState({
            FavoriteKeys: [...this.state.FavoriteKeys, JSON.stringify(p['id'])]
          })
        }
    })
    } catch(error) {
      console.error(`An error occured when getting products from favorites: ${error}`)
    }
  }

	getScans = async () => {
		try {
      this.setState({DATA: []})
      let product_keys = await this.getScannedKeys();
			product_keys.map( async (id_product) => {
        let current_item = await AsyncStorage.getItem(id_product);
        if (this.state.FavoriteKeys.includes(id_product)){
          this.setState({
            DATA: [...this.state.DATA, JSON.parse(current_item)]
          })
        }
      })
      
		} catch (error) {
      console.error(`error when getting products ids: ${error}`)
		}
  }

  render(){
    return (
      <View style={globalTextStyle.history}>
        <FlatList
          data={this.state.DATA}
          renderItem={ ({ item }) => <ListItem item={item} navigation={this.props.navigation} />}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    );
  }

}

export default FavoriteScreen;
