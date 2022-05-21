
import React,{Component} from 'react'
import {
    Text,
    StyleSheet,
    Image,
    View,
    TouchableOpacity,SafeAreaView, Platform
} from 'react-native'
import I18n from "../Service/Translate";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes';
import {images,colors} from '../Assets'
export default class History extends Component{
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
                        <View style={styles.inner}>
                            <View style={styles.btnBack}>
                                <TouchableOpacity onPress={()=>{NavigationService.goBack()}}>
                                    <MaterialIcons
                                        style={{fontWeight:'bold',color:colors.main_color,marginRight:'5%',fontSize:40}} 
                                        name="keyboard-arrow-left" size={15} color={'#ffffff'}> 
                                    </MaterialIcons>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.benner}>
                                <Image
                                    style={styles.centerLogo}
                                    source={images.logo}
                                />
                            </View>    
                            <View style={styles.btnBack}>

                            </View>
                        </View>
                        <View style={styles.listContainer}>
                            <TouchableOpacity style={styles.list}
                                onPress={()=>{NavigationService.navigate(NAV_TYPES.RESULTPACKAGE)}}>
                                    <View style={styles.imageBox} >
                                        <Image
                                            style={styles.Logo}
                                            source={require('../Assets/images/RFP.jpg')}
                                        />
                                    </View>
                                    <View style={styles.listTitleBox} >
                                        <Text style={styles.text}>{I18n.t('totalSendingHistory')}</Text>
                                    </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.listContainer}>
                            <TouchableOpacity style={styles.list}
                                onPress={()=>{NavigationService.navigate(NAV_TYPES.RESULTSUCCESS)}}>
                                <View style={styles.imageBox} >
                                    <Image
                                        style={styles.Logo}
                                        source={require('../Assets/images/SuccessTick.jpg')}
                                    />
                                </View>
                                <View style={styles.listTitleBox} >
                                <Text style={styles.text}>{I18n.t('historyOfSuccessfulSending')}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.listContainer}>
                            <TouchableOpacity style={styles.list}
                                onPress={()=>{NavigationService.navigate(NAV_TYPES.UNSUCCESS)}}>
                                <View style={styles.imageBox} >
                                    <Image
                                        style={styles.Logo}
                                        source={require('../Assets/images/unSuccess.jpg')}
                                    />
                                </View>
                                <View style={styles.listTitleBox} >
                                <Text style={styles.text}>{I18n.t('historyOfUnsuccessfulSending')}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.listContainerLast}>
                            <TouchableOpacity style={styles.list}
                                onPress={()=>{NavigationService.navigate(NAV_TYPES.DELAY)}}>
                                    <View style={styles.imageBox} >
                                        <Image
                                            style={styles.Logo1} 
                                            source={require('../Assets/images/delay-Clock.jpg')}
                                        />
                                    </View>
                                <View style={styles.listTitleBox} >
                                    <Text style={styles.text}>{I18n.t('delayed')}</Text>
                                </View> 
                            </TouchableOpacity>
                        </View>
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
    },  
    inner:{
        flex: 0.15,
        flexDirection: 'row',
        // justifyContent: 'center',
        // backgroundColor: 'yellow',
    },
    btnBack:{
        flex: 0.2,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor: 'red',
    },
    listContainer:{
        flex: 0.1,
        flexDirection:'row',
        padding: 10,
        paddingBottom: 0,
    },
    listContainerLast:{
        flex: 0.1,
        flexDirection:'row',
        padding: 10,
    },
    list:{
        flex: 1,
        flexDirection:'row',
        backgroundColor:'white',
        borderRadius: 5,
    },
    imageBox:{
        flex:0.35,
        flexDirection:'row',
        // backgroundColor: 'red',
        // justifyContent:'center',
        alignItems: 'center',
    },
    listTitleBox:{
        flex:0.65,
        flexDirection:'row',
        // backgroundColor: 'yellow',
        // justifyContent:'center',
        alignItems: 'center',
    },
    Logo:{
        width: 40,
        height: 40,
        marginLeft: 20,
    },
    Logo1:{
        width: 50,
        height: 50,
        marginLeft: 12,
    },
    text:{
        fontSize: 18,
        color: 'black',
        fontFamily:'Battambang-Bold',
    },
    centerLogo: {
        width: 60,
        height: 60,
    },





    // btn: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     backgroundColor: 'green',
    //     marginRight: 10,
    // },
    benner: {
        flex: 0.6,
        justifyContent: 'center',
        alignItems: 'center',
    },
    // inner1:{
    //     flex: 0.1,
    //     flexDirection: 'row'
    // },
   
    // benner1: {
    //     flex: 0.30,
    //     backgroundColor: 'white',
    //     justifyContent: 'center',
    // },
    // benner2: {
    //     flex: 1,
    //     borderColor: 'skyblue',
    //     borderBottomWidth: 2,
    //     borderTopWidth: 2,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: 'white',
    // },
    // benner3: {
    //     flex: 1,
    //     borderColor: 'skyblue',
    //     borderBottomWidth: 2,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: 'white',
    // },
    // text:{
    //     fontSize: 20,
    //     color: 'skyblue',
    // },
    
    // Logo: {
    //     flex: 0.8,
    //     width: 50,
    //     height: 45,
    //     marginLeft: 20,
    // },
 
  });
  