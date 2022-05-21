import React,{Component} from 'react'
import {
    Text,
    StyleSheet,
    Alert,
    Image,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    TextInput,
    Dimensions,
    Modal,
} from 'react-native'
import I18n from "../Service/Translate";
import  Loading  from "../Components/Loading";
const { width, height } = Dimensions.get("window");
const formHeight = 73
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes'
export default class ChangePhone extends Component{
    constructor(prop){
        super(prop)
        this.state = {
            dataInput:{
                phone:'',
                oldPhone:'',
                confirmPassword:''
            },
            show:false
        }
        // this.state={radioResuil:null} 
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        const {user, navigation} = this.props
        const {dataInput} = this.state
        //validatePassword
        console.log('nextProps.user****', nextProps.user);
        if(nextProps.user.validateChangePhoneError && nextProps.user.validateChangePhoneError !== user.validateChangePhoneError){
            if(nextProps.user.validateChangePhoneError.data && nextProps.user.validateChangePhoneError.data.message && nextProps.user.validateChangePhoneError.data.message == "invalid_password"){
                 Alert.alert(I18n.t('alertInvalidePassword'))
                // alert(I18n.t('alertInvalidePassword'))
            }
            else{
                // alert('something went wrong')
                Alert.alert(I18n.t('alertWentWrong'))
            }
        }
        if(nextProps.user.validateChangePhone && nextProps.user.validateChangePhone !== user.validateChangePhone){
            this.handleGetSMS(dataInput.phone)
        }
        //sms
        if(nextProps.user.userGetSMSError && nextProps.user.userGetSMSError !== user.userGetSMSError){
            Alert.alert(I18n.t('alertWentWrong'))
        }
        if(nextProps.user.userGetSMS && nextProps.user.userGetSMS !== user.userGetSMS){
            NavigationService.navigate(NAV_TYPES.VERIFYCODE_CHANGE_PHONE, {data: {dataInput: dataInput, dataSMS: nextProps.user.userGetSMS}})
        }
    }
    
    handleChangeInput(key, value){
        const {dataInput} = this.state
        var val = value
        if(key == 'phone'){
            val = val.replace(/[^0-9]/g, '')
        }
        this.setState({
            dataInput:{
                ...dataInput,
                [key]:val
            }
        })
    }
    componentDidMount(){
        const {navigation} = this.props
        console.log('navigation.state.routeName', navigation.state.routeName);
        const {dataInput} = this.state
        var data = navigation.getParam('data', false)
        if(data){
            this.setState({
                dataInput:{
                    ...dataInput,
                    oldPhone:data
                }
            })
        }
        console.log(this.props);
    }
    handleCheckUpdate(){
        const {dataInput} = this.state
        var phone = dataInput.phone
        var oldPhone = dataInput.oldPhone
        if(phone.length < 8 || phone === ''){ //test here
            Alert.alert(I18n.t('alertInvalidPhonenumber'))
            return
        }
        if (phone[0] == '0') {
            phone = phone.substr(1, phone.length - 1)
        }
        phone = "855" + phone
        if(phone == oldPhone){ 
            Alert.alert(I18n.t('alertSameOldPhone'))
            return
        }
        this.handleModalAction(true)
    }
    handleGetSMS(phone){
        var phone_ = phone
        if (phone_[0] == '0') {
            phone_ = phone_.substr(1, phone_.length - 1)
        }
        phone_ = "855" + phone_
        this.props.userGetSMS({
            phone:phone_,
            setToken:false
        })
    }
    handleModalAction(action){
        this.setState({
            show:action
        })
    }
    handleValidatePass(){
        const {dataInput} = this.state
        var confirmPassword = dataInput.confirmPassword
        this.props.validatePassword({
            password: confirmPassword,
            variable:'validateChangePhone'
        })
    }
    render(){
        const {dataInput, show} = this.state
        const {user} = this.props
        return(
            <>
            {user.pending &&
                    <Loading/>
                }
               {/* <ScrollView style={styles.container}> */}
               <View style={styles.container}>
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : 'null'} style={styles.keyAvoid}>
                        <View style={styles.map}>
                            <View style={styles.headerImage}>
                                <Image style={{width:120,height:120}}
                                    source={require('../Assets/images/phone.png')}
                                />
                            </View>
                            <Text style={styles.MeassageTitle}>
                                {I18n.t('NewPhoneNumber')}
                            </Text>
                            <Text style={{fontSize:12,marginLeft:'10%',fontFamily:'Battambang-Bold',color:'white'}}>{I18n.t('CountryCode')}</Text>
                            <View style={styles.PhoneBox}>
                                <View style={styles.Code}  >
                                    <TextInput style={styles.inputBox}
                                        placeholder="+855"
                                        placeholderTextColor="white"
                                        color='white'
                                        fontSize={14}
                                        editable={false}
                                    />
                                </View>
                                <View style={styles.Phone}>
                                    <TextInput style={styles.inputBox} 
                                        placeholder={I18n.t('changePhoneNumber')}
                                        placeholderTextColor="#cae4db"
                                        keyboardType="numeric"
                                        color='white'
                                        fontSize={12}
                                        value={dataInput.phone}
                                        onChangeText={(value) => this.handleChangeInput('phone', value)}
                                        maxLength={10}
                                    />
                                </View>
                            </View>
                        </View>    
                        <View style={styles.formContent}>
                            <TouchableOpacity style={styles.footer}
                                onPress={() => this.handleCheckUpdate()} >
                                <Text style={styles.ready}>{I18n.t('buttonDone')}</Text>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.readyBtnModal}
                            // onPress={()=>this.handleUpdateInformation()}
                            onPress={()=>{this.setState({show:true})}}
                        >
                            {/* <Text style={styles.btnTitleModal}>{I18n.t('buttonDone')}</Text> */}
                            <Modal transparent={true} visible={show}>
                                <View style={{backgroundColor: 'rgba(0,0,0,0.5)',flex:1,justifyContent:'center'}}>
                                    <View style={{backgroundColor:'#ffffff',margin:30,borderRadius:10,height:200,shadowColor: "#000",shadowOffset: {
                                            width: 0,
                                            height: 6,
                                        },
                                        shadowOpacity: 0.37,
                                        shadowRadius: 7.49,
                                        elevation: 12,}}>
                                        <View style={styles.HeaderTitleModal}>
                                            <Text style={styles.HeaderTitleModal} style={{fontSize:16,fontWeight:'bold',color:'black',}}>{I18n.t('confirmPassword')}</Text>
                                        </View>
                                    
                                        <TextInput style={styles.inputBoxModal}
                                            placeholder={I18n.t('confirmPassword')}
                                            placeholderTextColor="grey"
                                            keyboardType="default"
                                            color='black'
                                            fontSize={14}
                                            secureTextEntry={true}
                                            value={dataInput.confirmPassword}
                                            onChangeText={(value) => this.handleChangeInput('confirmPassword', value)}
                                        />
                                        <TouchableOpacity style={styles.footerBtnModal} 
                                            onPress={()=>{this.setState({show:false}),this.handleValidatePass()}}>
                                            <Text style={{fontSize:14,fontFamily:'Battambang-Bold',color:'white'}}>{I18n.t('buttonDone')}</Text>
                                        </TouchableOpacity>
                                    </View>  
                                </View>
                            </Modal>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                    </View>
                {/* </ScrollView> */}
            </>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#02475e',
    },
    keyAvoid:{
        //backgroundColor:'red',
        height:'100%'
    },  
    map:{
        width:'100%',
        height: height - formHeight,
    },
    formContent:{
        width:'100%',
        height: formHeight-24,
        backgroundColor:'#02475e',
        position:'relative'
    }, 
    headerImage:{
        flex: 0.3,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        top:20,
        // backgroundColor:'red'
    },
    MeassageTitle:{
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        fontFamily:'Battambang-Bold',
        // marginLeft:'10%',
        // marginRight:'10%'
        margin:'10%',
        marginBottom:'10%',
    },
    PhoneBox:{
        // flex:0.01,
        flexDirection:"row",
        // backgroundColor:'red',
        paddingLeft:'10%',
        paddingRight:'10%',
    },
    inputBox:{
        borderBottomColor: '#ffffff',
        borderBottomWidth: 1,
        flex:1,
        height:50,
        fontFamily:'Battambang-Bold', 
    },
    Code:{
        flex:0.26,
        flexDirection:'row',
        
    },
    Phone:{
        flex:0.74,
        flexDirection:'row',
        marginLeft:15,
    },
    footer:{
        //flex:0.3,
        // flexDirection:'row',
        width:'100%',
        paddingVertical: 10,
        flexDirection: 'row',
        backgroundColor: '#fb3640',
        justifyContent: 'center',
        alignItems: 'center',
        // borderTopColor:'white',
        // borderTopWidth:3, 
        position:'absolute',
        // marginTop:'11%',
        bottom:"0%",
        alignSelf:'flex-end'
        
    },
    ready:{
        fontSize: 18,
        color:  'white',
        fontFamily:'Battambang-Bold',
    },
    readyBtnModal:{
        flex:0.08,
        height:50,
        flexDirection:'row',
        backgroundColor:'#02475e',
        margin:10,
        marginTop:20,
        justifyContent:'center',
        alignItems:'center'
     },
     btnTitleModal:{
        color:"white",
        fontSize:18,
        fontFamily:'Battambang-Bold',
     },
     //FormPopUP
     HeaderTitleModal:{
        height:60,
        flexDirection:'row',
        backgroundColor:'#ffffff',
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        // borderTopEndRadius:10,
        // borderTopStartRadius:10,
        borderBottomColor:'grey',
        borderBottomWidth:1,
    },
    inputBoxModal:{
        height:50,
        flexDirection:"row",
        borderBottomColor: '#ffffff',
        borderBottomWidth: 1,
        fontFamily:'Battambang-Bold', 
        margin:10,
        alignItems:'center',
        borderBottomColor:'black',
        marginLeft:'10%',
        marginRight:'10%'
    },
    footerBtnModal:{
        height:50,
        width:'100%',
        height:50,
        flexDirection:'row',
        backgroundColor:'#02475e',
        //#fb3640
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        // borderBottomEndRadius:10,
        // borderBottomStartRadius:10,
        position:'absolute',
        bottom: 0,
    },
  });
  