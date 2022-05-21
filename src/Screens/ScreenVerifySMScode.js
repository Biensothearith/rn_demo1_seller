import NavigationService from '../Service/navigationService'
import {NAV_TYPES} from '../Navigation/navTypes'
import React,{Component} from 'react'
import  Loading  from "../Components/Loading";
import I18n from "../Service/Translate";
import SMSVerifyCode from 'react-native-sms-verifycode';
import {images,colors} from '../Assets'
import {
    Text,
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
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
            code:''
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        const {user} = this.props
        const {dataInput} = this.state
        if(nextProps.user.userRegisterError && nextProps.user.userRegisterError !== user.userRegisterError){
            if(nextProps.user.userRegisterError.data && nextProps.user.userRegisterError.data.message && nextProps.user.userRegisterError.data.message == "duplicate_number"){
                Alert.alert(I18n.t('alertChangePhoneRegisted'))
            }else if(nextProps.user.userRegisterError.data && nextProps.user.userRegisterError.data.message && nextProps.user.userRegisterError.data.message == "invalid_sms"){
                Alert.alert(I18n.t('alertSMSCodeWrong'))
            }else{
                Alert.alert(I18n.t('alertWentWrong'))
            }
        }
        if(nextProps.user.userRegister && nextProps.user.userRegister !== user.userRegister){
            NavigationService.navigate(NAV_TYPES.LOGIN, {data: dataInput})
        }
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
        this.setState({
            dataInput:data,
        })
    }
    handleUserRegister(){
        const { dataInput, code } = this.state;
        var phone = dataInput.phone
        if (phone[0] == '0') {
            phone = phone.substr(1, phone.length - 1)
        }
        phone = "855" + phone
        this.props.userRegister({
            ...dataInput,
            phone:phone,
            smsCode:code 
        })
    }

    handleCodeChange(value){
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
                                            source={images.logo}
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
                                        containerPaddingHorizontal={50}
                                        verifyCodeLength={6}
                                        codeFontSize={16}
                                        codeViewBorderWidth={3}
                                        codeViewBorderRadius={0}
                                        codeViewBorderColor={colors.main_color}
                                        secureTextEntry="password"
                                        value={code}
                                        onInputChangeText={(value) => this.handleCodeChange(value)}
                                    />
                                </View>
                            <TouchableOpacity style={styles.btnSignIn}
                                onPress={() => this.handleUserRegister()} >
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
        width: 120,
        height: 120,
        marginTop:50,
    },
    HeaderTitle:{
        fontSize: 16,
        color: colors.gray_dark,
        textAlign: 'center',
        fontFamily:'Battambang',
    },

    Boxcode:{
        flexDirection:'row',
        marginTop: 50,
        marginBottom: 20,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    
    
    btnSignIn:{
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft:'12%',
        marginRight:'12%',
        padding: 7,
        height: 46,
        marginTop:0,
        backgroundColor: colors.gray_dark,
        alignItems: 'center',
        borderRadius: 5,
    },
    signInTitle:{
        fontSize: 16,
        color: colors.white,
        fontFamily:'Battambang'
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
