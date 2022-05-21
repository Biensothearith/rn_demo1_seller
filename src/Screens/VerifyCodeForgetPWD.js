import NavigationService from '../Service/navigationService'
import {NAV_TYPES} from '../Navigation/navTypes'
import React,{Component,Fragment} from 'react'
import  Loading  from "../Components/Loading";
import I18n from "../Service/Translate";
import SMSVerifyCode from 'react-native-sms-verifycode'
import {
    Text,
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    TextInput,
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView,
    Alert,
} from 'react-native'
export default class VerifyCode extends Component{
    constructor(prop){
        super(prop)
        this.state={    
            dataInput:false,
            datatoken:false,
            code:''
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        const {user} = this.props
        const {dataInput} = this.state
        if(nextProps.user.forgetPWDError && nextProps.user.forgetPWDError !== user.forgetPWDError){
            if(nextProps.user.forgetPWDError.data && nextProps.user.forgetPWDError.data.message && nextProps.user.forgetPWDError.data.message == "duplicate_number"){
                Alert.alert(I18n.t('alertChangePhoneRegisted'))
            }else if(nextProps.user.forgetPWDError.data && nextProps.user.forgetPWDError.data.message && nextProps.user.forgetPWDError.data.message == "invalid_sms"){
                // alert('Your SMS code is wrong!')
                Alert.alert(I18n.t('alertSMSCodeWrong'))
            }else{
                Alert.alert(I18n.t('alertWentWrong'))
            }
        }
        // if(nextProps.user.forgetPWD && nextProps.user.forgetPWD !== user.forgetPWD){
        //     NavigationService.navigate(NAV_TYPES.LOGIN, {data: dataInput})
        // }
    }
    handleChangeInput(key, value){
        const {dataInput} = this.state
        var val = value
        this.setState({
            dataInput:{
                ...dataInput,
                [key]:val
            }
        })
    }
    componentDidMount(){
        const { navigation } = this.props;
        var data = navigation.getParam('data', false);
        // var data1 = navigation.getParam('data1', false);
        this.setState({
            dataInput:data,
            // datatoken:data1
        })
    }
    handleUserForgetPassword(){
        const { dataInput, code , datatoken } = this.state;
        var phone = dataInput.phone
        var password = dataInput.newPassword
        var tokenSMS = dataInput.Token
        var smsCode = code
        if (phone[0] == '0') {
            phone = phone.substr(1, phone.length - 1)
        }
        phone = "855" + phone
        console.log('password',password)
        console.log('phone',phone);
        console.log('tokenSMS',tokenSMS);
        console.log('smsCode',smsCode);
        this.props.forgetPassword({
            password,
            tokenSMS,
            phone:phone,
            smsCode,
        })
    }

    handleCodeChange(value){
        // console.log('value', value);
        this.setState({
            code:value
        })
    }


    render(){
        const {dataInput, code} = this.state
        const {user} = this.props
        return(
            <>
                {user.pending &&
                    <Loading/>
                }
                <SafeAreaView style={{flex:Platform.OS == 'ios' ? 1:1}}>
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : 'null'} style={styles.container}>
                        <ScrollView style={{flex:1}}>
                                <View style={styles.inner}>
                                    <View style={styles.benner}>
                                        <Image
                                            style={styles.centerLogo}
                                            source={require('../Assets/images/logoMST.png')}
                                        />
                                    </View>     
                                </View>        
                                <Text style={styles.HeaderTitle}>
                                    {I18n.t('waitMessage')}:
                                </Text>   
                                <Text style={styles.HeaderTitle}>
                                    ​{I18n.t('DigitCode')}:
                                </Text>           
                                <View style={styles.Boxcode}>
                                    <SMSVerifyCode
                                        ref={ref => (this.verifycode = ref)}
                                        onInputCompleted={this.onInputCompleted}
                                        containerPaddingHorizontal={35}
                                        verifyCodeLength={6}
                                        codeFontSize={18}
                                        codeViewBorderWidth={3}
                                        codeViewBorderRadius={5}
                                        codeViewBorderColor="#005792"
                                        secureTextEntry="password"
                                        value={code}
                                        // initialCodes={[1,2,3,4,5,6]}
                                        onInputChangeText={(value) => this.handleCodeChange(value)}
                                    />
                                </View>
                            <TouchableOpacity style={styles.btnSignIn}
                                onPress={() => this.handleUserForgetPassword()} >
                                <Text style={styles.signInTitle}> {I18n.t('buttonDone')}</Text>
                            </TouchableOpacity>
                        </ScrollView>   
                    </KeyboardAvoidingView>
                </SafeAreaView>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#fff',
    },
    inner:{
        flex: 0.2,
        flexDirection: 'row',
        fontSize: 16,
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    benner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        
    },
    centerLogo: {
        flex: 1,
        width: 180,
        height: 100,
        marginTop:10,
    },
    HeaderTitle:{
        fontSize: 20,
        color: '#005792',
        textAlign: 'center',
        fontFamily:'Battambang-Bold',
        margin:'10%',
        marginBottom:'0%',
        marginTop:'0%',
    },

    Boxcode:{
        height: 40,
        flexDirection:'row',
        marginTop: 50,
        marginBottom: 50,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputBox:{
        width: '11%',
        borderWidth:2,
        borderColor:'#005792',
        borderRadius: 5,
        margin:5 ,
        marginTop: 0,
        marginBottom:0, 
        textAlign:'center'
    },
    inputText:{
        fontSize: 20,
        color: 'grey',
        paddingLeft: 20,
    },
    btnSignIn:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft:'12%',
        marginRight:'12%',
        fontSize: 20,
        padding: 7,
        height: 50,
        marginTop:0,
        backgroundColor: '#005792',
        alignItems: 'center',
        borderRadius: 5,
    },
    signInTitle:{
        fontSize: 16,
        color: 'white',
        fontFamily:'Battambang-Bold'
    },
    register:{
        flex: 0.15,
        fontSize: 16,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor:'white'
    },
    registerLink:{
        fontSize: 18,
        color: '#1E90FF',
    },
    BtnReset:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft:'12%',
        marginRight:'12%',
        fontSize: 20,
        padding: 7,
        height: 50,
        marginTop:0,
        backgroundColor: '#005792',
        alignItems: 'center',
        borderRadius: 5,
        marginTop:10,
    },
})
