import React,{Component} from 'react'
import {Text,StyleSheet,Image,View,TouchableOpacity} from 'react-native'
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes'

export default class Report extends Component{
    constructor(prop){
        super(prop)
        this.state={
           
        } 
    }
    render(){
        return(
            <>
                <View style={styles.container}>
                    <View style={styles.inner}>
                        <View style={styles.benner}>
                            <Image
                                style={styles.centerLogo}
                                source={require('../Assets/images/logoMST.png')}
                            />
                        </View>     
                    </View>
                    {/* LIST  */}
                    <View style={styles.inner1}>
                        <View style={styles.bennerfirst}>
                            <Image
                                style={styles.data}
                                source={require('../Assets/images/report.png')}
                            />
                        </View>
                        <TouchableOpacity style={styles.btn}
                                onPress={()=>{NavigationService.navigate(NAV_TYPES.RESULTPACKAGE)}}
                                >
                            <View style={styles.benner2}>
                                <Text style={styles.text}>បញ្ជី នូវ​ថ្ងៃ 03, មេសា,​ 2021 </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.inner1}>
                        <View style={styles.benner1}>
                            <Image
                                style={styles.data}
                                source={require('../Assets/images/report.png')}
                            />
                        </View>
                        <TouchableOpacity style={styles.btn}
                                onPress={()=>{NavigationService.navigate(NAV_TYPES.RESULTPACKAGE)}}
                                >
                            <View style={styles.benner3}>
                                <Text style={styles.text}>បញ្ជី នូវ​ថ្ងៃ 02, មេសា,​ 2021</Text>
                            </View>
                        </TouchableOpacity> 
                    </View>
                </View>
                
            </>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex:1, 
        backgroundColor: 'white',
    },
    inner:{
        flex: 0.15,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    btn:{
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'green',
    },
    benner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    inner1:{
        flex: 0.1,
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 10,
    },
    bennerfirst: {
        flex: 0.30,
        backgroundColor: 'white',
        borderColor: 'skyblue',
        borderTopWidth: 2,
        borderBottomWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    benner1: {
        flex: 0.30,
        backgroundColor: 'white',
        borderColor: 'skyblue',
        borderBottomWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    benner2: {
        flex: 1,
        borderColor: 'skyblue',
        borderBottomWidth: 2,
        borderTopWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
  
    benner3: {
        flex: 1,
        borderColor: 'skyblue',
        borderBottomWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    text:{
        fontSize: 18,
        color: 'skyblue',
    },
    text1:{
        fontSize: 10,
        color: 'skyblue',
    },
    centerLogo: {
        flex: 1,
        width: 150,
        height: 100,
    },
    data: {
        flex: 1,
        width: 55,
        height: 100,
    },
  });
  