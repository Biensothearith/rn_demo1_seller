import React,{Component} from 'react'
import  Loading  from "../Components/Loading";
import {
    Text,
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
    KeyboardAvoidingView,
    Alert,
    Platform,
} from 'react-native'
import I18n from "../Service/Translate";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes'
import { SafeAreaView } from 'react-navigation';
import {colors,images} from '../Assets'
export default class Register extends Component{
    constructor(prop){
        super(prop)
        this.state = {
            dataInput:{
                name:'',
                phone:'',
                password:'',
                confirmPassword:'',
                bankName:'',
                accountName:'',
                accountNumber:'',
            }
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        const {user} = this.props
        const {dataInput} = this.state
        if(nextProps.user.userGetSMSError && nextProps.user.userGetSMSError !== user.userGetSMSError){
            Alert.alert(I18n.t('alertWentWrong'))
        }
        if(nextProps.user.userGetSMS && nextProps.user.userGetSMS !== user.userGetSMS){
            NavigationService.navigate(NAV_TYPES.VERIFYCODE, {data: dataInput})
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
    handleUserGetSMS(){
        const {dataInput} = this.state
        var phone = dataInput.phone
        var password = dataInput.password
        var confirmPassword = dataInput.confirmPassword
        if(phone == ''){
            Alert.alert(I18n.t('alertInvalidPhone'))
        }
        else if(password == ''){
            Alert.alert(I18n.t('alertInvalidPassword'))
        }
        else if(confirmPassword == ''){
            Alert.alert(I18n.t('alertInvalidConfirmPassword'))
        }
        else if (phone[0] == '0') {
            phone = phone.substr(1, phone.length - 1)
            if (password != confirmPassword) {
                Alert.alert(I18n.t('alertPassNotMatch'))
            }
            else{
                phone = "855" + phone
                this.props.userGetSMS({
                    phone:phone,
                    setToken:true
                })
            }
        }
        
       
    }
    renderRadioButton(){
        const radios=[
            {titile:"",value:"A"},
        ];
        var rs=[];
        radios.map((one,i)=>{
            rs.push(
                <TouchableOpacity key={i} onPress={()=>{this.setState({radioResuil:one['value']})}}>
                    {
                        one && one.value===this.state.radioResuil?
                        <View>
                            <MaterialCommunityIcons name="check-circle-outline" size={20} color={colors.main_color}><Text style={{color:'#005792', fontSize:16}}>{one['titile']}</Text></MaterialCommunityIcons>
                        </View>:
                        <View>
                            <MaterialCommunityIcons name="checkbox-blank-circle-outline" size={20} color={colors.main_color}><Text style={{color:'#005792', fontSize:16}}>{one['titile']}</Text> </MaterialCommunityIcons>    
                        </View>
                    }
                </TouchableOpacity>
            )
        })
        return rs
    }
    render(){
        const {dataInput} = this.state
        const {user} = this.props
        return(
            <>
            {user.pending &&
                    <Loading/>
            }
            <SafeAreaView style={{flex:Platform.OS == 'ios' ? 1:1, backgroundColor:'white'}}>
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
                            {I18n.t('register')}
                        </Text>
                        <TextInput style={styles.inputBox}
                            placeholder={I18n.t('enterPhone')}
                            placeholderTextColor="grey"
                            color='black'
                            fontSize={14}
                            value={dataInput.phone}
                            onChangeText={(value) => this.handleChangeInput('phone', value)}
                        />
                        <TextInput style={styles.inputBox}
                            placeholder={I18n.t('enterPassword')}
                            placeholderTextColor="grey"
                            color='black'
                            secureTextEntry={true}
                            value={dataInput.password}
                            onChangeText={(value) => this.handleChangeInput('password', value)}
                        />
                        <TextInput style={styles.inputBox}
                            placeholder={I18n.t('confirmPassword')}
                            placeholderTextColor="grey"
                            color='black'
                            secureTextEntry={true}
                            value={dataInput.confirmPassword}
                            onChangeText={(value) => this.handleChangeInput('confirmPassword', value)}
                        />
                        <TextInput style={styles.inputBox}
                            placeholder={I18n.t('bank')}
                            placeholderTextColor="grey"
                            color='black'
                            value={dataInput.bankName}
                            onChangeText={(value) => this.handleChangeInput('bankName', value)}
                        />
                        <TextInput style={styles.inputBox}
                            placeholder={I18n.t('AccountName')}
                            placeholderTextColor="grey"
                            color='black'
                            value={dataInput.accountName}
                            onChangeText={(value) => this.handleChangeInput('accountName', value)}
                        />
                        <TextInput style={styles.inputBox}
                            placeholder={I18n.t('BankNumber')}
                            placeholderTextColor="grey"
                            color='black'
                            value={dataInput.accountNumber}
                            onChangeText={(value) => this.handleChangeInput('accountNumber', value)}
                        />
                        <View style={styles.tick}>
                            {this.renderRadioButton()}
                            <Text style={{color:colors.gray_dark, fontSize:14,fontFamily:'Battambang', }}>{I18n.t('registerRadioButton')}</Text>
                        </View>

                        <TouchableOpacity style={styles.btnSignIn}
                            onPress={() => this.handleUserGetSMS()}
                            >
                            <Text style={styles.signInTitle}> {I18n.t('buttonNext')}</Text>
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
        backgroundColor: 'white',
    },
    inner:{
        flex: 0.12,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    benner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerLogo: {
        flex: 1,
        width: 120,
        height: 120,
        marginTop:50
    },
    HeaderTitle:{
        fontSize: 16,
        color: colors.gray_dark,
        textAlign: 'center',
        fontFamily:'Battambang',
        marginTop:10,
        marginBottom:20
    },
    inputBox:{
        flex:1,
        flexDirection:"row",
        fontFamily:'Battambang', 
        marginLeft:"10%",
        marginRight:"10%",
        marginBottom:10,
        paddingLeft:10,
        borderColor:colors.gray_ligth,
        borderWidth:1,
        borderRadius:5,

    },
    btnSignIn:{
        flex: 0.8,
        flexDirection: 'row',
        justifyContent: 'center',
        marginLeft:'10%',
        marginRight:'10%',
        fontSize: 20,
        padding: 7,
        height: 50,
        backgroundColor:colors.gray_dark,
        alignItems: 'center',
        borderRadius:5
    },
    signInTitle:{
        fontSize: 16,
        color: colors.white,
        fontFamily:'Battambang', 
    },
    tick:{
        flex: 0.1,
        flexDirection:'row',
        justifyContent:'flex-start',
        alignItems:'center',
        paddingBottom:10,
        marginLeft:'10%'
    },
  });
  