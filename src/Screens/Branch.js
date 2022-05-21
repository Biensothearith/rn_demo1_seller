import React,{Component} from 'react'
import {
    Text,
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    Linking,SafeAreaView, Platform
} from 'react-native'
import  Loading  from "../Components/Loading";
import I18n from "../Service/Translate";
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes'
import { color } from 'react-native-reanimated'
export default class Branch extends Component{
    constructor(prop){
        super(prop)
        this.state = {
            dataBranch:[],
            dataInput:0
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        const {user} = this.props
        if(nextProps.user.dataBranch && nextProps.user.dataBranch !== user.dataBranch){
            if(nextProps.user.dataBranch.length > 0){
                this.setState({
                    dataBranch: nextProps.user.dataBranch
                })
            }
        }
    }
    componentDidMount(){
        this.props.getBranch()
        try {
            const { navigation } = this.props;
            var data = navigation.getParam('data', false);
            console.log('data',data)
            this.setState({
            dataInput:data
        })
        } catch (error) {
            console.log('error',error)
        }
    }
    
    //phone_call
    handleCallHeadOffice(){
        const {dataBranch,dataInput} = this.state
        // console.log('dddddddd',dataBranch);
        // if(dataInput.length > 0){
            var phone = dataInput.phone
            Linking.openURL('tel:'+phone)
        // }
    }
    handleMessagerHeadOffice(){
        const {dataBranch,dataInput} = this.state
        // console.log('dddddddd',dataBranch);
        // if(dataInput.length > 0){
            var messenger = dataInput.messengerLink
            Linking.openURL(messenger)
        // }
    }
    render(){
        const {user} = this.props
        return(
            <>
            {user.pending &&
                    <Loading/>
                }
                <View style={styles.container}>
                    <SafeAreaView style={{flex:Platform.OS == 'ios' ? 0.33:0.33,backgroundColor: Platform.OS == 'ios' ? '#02475e':'02475e'}}>
                        <View style={styles.headerTitle}>
                            <Text style={{fontSize:22, color:'white',fontFamily:'Battambang-Bold',}}>{I18n.t('ContactCompany')}</Text>
                        </View>
                        <View style={styles.ContactBox}>
                            <View style={styles.PhoneBox}>
                                <TouchableOpacity 
                                    style={styles.iconBox}
                                    onPress={() => this.handleCallHeadOffice()}
                                >
                                    <MaterialIcons style={styles.call} name="phone-in-talk"> </MaterialIcons>
                                </TouchableOpacity>
                                
                                <TouchableOpacity 
                                    style={styles.contactTitle}
                                    onPress={() => this.handleCallHeadOffice()}
                                >
                                    <Text style={{
                                        textAlign:'center',
                                        color:'white',
                                        fontSize:12,
                                        fontFamily:'Battambang-Bold'
                                        }}>
                                            {I18n.t('callContact')}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.MessageBox} >
                                <TouchableOpacity 
                                    style={styles.iconBox1}
                                    onPress={() => this.handleMessagerHeadOffice()}
                                >
                                    <Fontisto style={styles.messeger} name="messenger"> </Fontisto>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={styles.contactTitle1}
                                    onPress={() => this.handleMessagerHeadOffice()}
                                >
                                    <Text style={{
                                        textAlign:'center',
                                        color:'white',
                                        fontSize:12,
                                        fontFamily:'Battambang-Bold'
                                        }}>
                                            {I18n.t('MessageContact')}
                                    </Text>
                                </TouchableOpacity>
                            </View>   
                        </View>
                    </SafeAreaView>
                    {/* <View flex={0.01}
                        style={{
                            borderBottomColor: '#02475e',
                            borderBottomWidth: 3, Top:0,
                            backgroundColor:'#02475e',
                        }}
                    /> */}
                </View>
            </>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
    },
    headerTitle:{
        flex: Platform.OS == 'ios' ? 0.4:0.4,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#02475e',
    },
    ContactBox:{
        flex: Platform.OS == 'ios' ? 0.65:0.65,
        flexDirection:'row',
        backgroundColor:'#02475e',
        // backgroundColor:'yellow'
    },
    PhoneBox:{
        flex:0.5,
        resizeMode:'contain',
        // justifyContent:'center',
        alignItems:'center',
    },
    contactTitle:{
        width:'60%',
        height:'20%',
        marginLeft:55,
        resizeMode:'contain',
        // backgroundColor:'green',
        justifyContent:'center',
        textAlign:'center',
    },  
    contactTitle1:{
        width:'60%',
        height:'20%',
        marginRight:55,
        resizeMode:'contain',
        // backgroundColor:'green',
        justifyContent:'center',
        textAlign:'center',
    },  
    MessageBox:{
        flex:0.5,
        resizeMode:'contain',
        // justifyContent:'center',
        alignItems:'center',
    },
    iconBox:{
        width:'60%',
        height:'70%',
        resizeMode:'contain',
        backgroundColor:'white',
        marginLeft:55,
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center',
    },
    iconBox1:{
        width:'60%',
        // height:'85%',
        height:'70%',
        resizeMode:'contain',
        backgroundColor:'white',
        marginRight:55,
        borderRadius:15,
        justifyContent:'center',
        alignItems:'center',
        // textAlign:'center'
    },
    // contactImage:{
    //     width:80,
    //     height:80,
    // },
    call:{
        // marginLeft:Platform.OS == 'ios' ? 22:14,
        fontSize: 65,
        color:'#02475e',
        alignSelf:'center',
        marginLeft:15,
        top:Platform.OS == 'ios' ? 12:0
    },
    messeger:{
        marginLeft:25,
        fontSize: 57,
        color:'#02475e',
        alignSelf:'center',
    },
    branch:{
        flex: 0.08,
        flexDirection:'row',
        borderBottomColor:'#02475e',
        borderBottomWidth:1,
        alignItems:'center',
    },
    ListTitle:{
       color:"#02475e",
       fontSize:14,
       marginLeft:20,
       fontFamily:'Battambang-Bold',
    },
  });
