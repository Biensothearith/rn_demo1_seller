import React,{Component} from 'react'
import {
    View, ActivityIndicator, StyleSheet
} from 'react-native'
import NavigationService from "../Service/navigationService";
import { NAV_TYPES } from "../Navigation/navTypes";
import AsyncStorage from "@react-native-community/async-storage"
export default class Home extends Component{
    constructor(prop){
        super(prop)
        this.state={
           
        }
    }
    _retrieveLanguage = async () => {
        try {
          const value = await AsyncStorage.getItem('defaultLocale');
          if (value !== null) {
            return value
          }
        } catch (error) {
          return 'en'
        }
      };
    async componentDidMount(){
        var lang = await this._retrieveLanguage()
        this.props.setLocale({lang:lang})
        this.props.startupWorker()
        // AsyncStorage.removeItem('@DataLogin')
        // setTimeout(() => {
        // }, 2000);
    }
    render(){
        return(
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center"
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
})