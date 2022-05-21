import React,{Component} from 'react'
import {
    Text,
    StyleSheet,
    Image,
    View,
    TouchableOpacity,SafeAreaView, Platform
} from 'react-native'
import I18n from "../Service/Translate";
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes'
export default class Message extends Component{
   
    constructor(prop){
        super(prop)
        this.state={
        
        } 
    }
    render(){
        return(
            <>
                <SafeAreaView style={{flex:Platform.OS == 'ios' ? 1:1, backgroundColor: Platform.OS == 'ios' ? 'white':'null'}}>
                    <View style={styles.container}>
                        <View style={styles.CircleTick}>
                            <Image style={{width:150,height:150}}
                                source={require('../Assets/images/DefentTick.png')}
                            />
                        </View>
                        <Text style={styles.MeassageTitle}>
                                {I18n.t('message')}
                        </Text>

                        <TouchableOpacity style={styles.ready}
                            onPress={() => NavigationService.navigate(NAV_TYPES.MAIN_HOME01)} >
                            <Text style={styles.Title}>{I18n.t('buttonDone')}</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>
            </>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
        position:'relative'
    },
    CircleTick:{
        flex: 0.3,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        // backgroundColor:'red',
        marginTop:Platform.OS == 'ios' ? '5%':'10%'
    },
    Tick:{
        height: 150,
        width: 150,
        borderRadius: 150,
        backgroundColor: '#32CD32',
        justifyContent:'center',
        alignItems: 'center',
    },
    Tickicon:{
        fontSize: 70,
        color: 'white',
        paddingLeft: 25,
    },
    MeassageTitle:{
        fontSize: 20,
        color: 'black',
        textAlign: 'center',
        fontFamily:'Battambang-Bold',
        marginLeft: 28,
        marginRight: 28,
        marginTop:"5%"
    },
    ready:{
        height:60,
        flexDirection: 'row',
        backgroundColor: '#30cc25',
        justifyContent:'center',
        alignItems: 'center',
        marginLeft: '30%',
        marginRight: '30%',
        // borderRadius:50,
        marginTop:'5%'
    },
    Title:{
        fontSize: 18,
        color:  'white',
        fontFamily:'Battambang-Bold',
    },
    successImageBox:{
        flex: 0.25,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        top:'5%'
        // backgroundColor:'red'
    },
  });
  