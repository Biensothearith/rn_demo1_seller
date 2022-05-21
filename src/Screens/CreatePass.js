import React,{Component} from 'react'
import {
    Text,
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    TextInput,
    Dimensions,
    Alert,
} from 'react-native'
import I18n from "../Service/Translate";
import  Loading  from "../Components/Loading";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'


const { width, height } = Dimensions.get("window");
const formHeight = 73
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes'
export default class CreatePass extends Component{
   
    constructor(prop){
        super(prop)
        this.state = {
            dataInput:{
                // oldPassword:'123456',
                // password:'123456',
                // confirmPassword :'123456',
                oldPassword:'',
                password:'',
                confirmPassword :'',
            }
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        const {user, navigation} = this.props
        const {dataInput} = this.state
      
        if(nextProps.user.validatePasswordError && nextProps.user.validatePasswordError !== user.validatePasswordError){
            if(nextProps.user.validatePasswordError.data && nextProps.user.validatePasswordError.data.message && nextProps.user.validatePasswordError.data.message == "invalid_password"){
                // alert('invalid_password')
                Alert.alert(I18n.t('alertInvalidePassword'))
            }
            else{
                // alert('something went wrong')
                Alert.alert(I18n.t('alertWentWrong'))
            }
        }
        if(nextProps.user.validatePassword && nextProps.user.validatePassword !== user.validatePassword){
            console.log('navigation.state.routrName', navigation.state.routeName);
            if(navigation.state.routeName == "CREATEPASS"){
                this.handleChangePassword()
            }
        }

        if(nextProps.user.changePasswordError && nextProps.user.changePasswordError !== user.changePasswordError){
            // alert('something went wrong')
            Alert.alert(I18n.t('alertWentWrong'))
        }
        if(nextProps.user.changePassword && nextProps.user.changePassword !== user.changePassword){
            // alert("Your password has been changed")
            Alert.alert(I18n.t('alertPasswordChanged'))
            NavigationService.navigate(NAV_TYPES.CREDITDETAIL)
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
    handleValidatePassword(){
        const {dataInput} = this.state
        var oldPassword = dataInput.oldPassword
        this.props.validatePassword({
            password: oldPassword,
            variable:'validatePassword'
        })
    }
    componentDidMount(){
        console.log(this.props);
    }
    handleChangePassword(){
        const {dataInput} = this.state
        var password = dataInput.password
        var confirmPassword = dataInput.confirmPassword
        if(password != confirmPassword){
            // alert('Password not match')
            Alert.alert(I18n.t('alertPassNotMatch'))
            return
        }
        this.props.changePassword({
           password:password
        })
    }
    render(){
        const {dataInput} = this.state
        const {user} = this.props
        return(
            <>
            {user.pending &&
                <Loading/>
                }
                <ScrollView style={styles.container}>
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : 'null'} style={styles.keyAvoid}>
                        <View style={styles.upBox}>
                            <View style={styles.headerImage}>
                                <Image style={{width:120,height:120}}
                                    source={require('../Assets/images/lock.png')}
                                />
                            </View>
                            
                            <Text style={styles.MeassageTitle}>
                                    {I18n.t('CreatePassword')}
                            </Text>
                            <TextInput style={styles.inputBox}
                                placeholder={I18n.t('oldPassword')}
                                placeholderTextColor="#cae4db"
                                keyboardType="default"
                                color='white'
                                fontSize={12}
                                secureTextEntry={true}
                                value={dataInput.oldPassword}
                                onChangeText={(value) => this.handleChangeInput('oldPassword', value)}
                            />
                            <TextInput style={styles.inputBox}
                                placeholder={I18n.t('newPassword')}
                                placeholderTextColor="#cae4db"
                                keyboardType="default"
                                color='white'
                                fontSize={12}
                                secureTextEntry={true}
                                value={dataInput.password}
                                onChangeText={(value) => this.handleChangeInput('password', value)}
                            />
                            <TextInput style={styles.inputBox}
                                placeholder={I18n.t('confirmNewPassword')}
                                placeholderTextColor="#cae4db"
                                keyboardType="default"
                                color='white'
                                fontSize={12}
                                secureTextEntry={true}
                                value={dataInput.confirmPassword}
                                onChangeText={(value) => this.handleChangeInput('confirmPassword', value)}
                            />
                            <Text style={{marginLeft:'10%',marginTop:10,fontSize:14,fontFamily:'Battambang-Bold',color:'#cae4db'}}>
                                {I18n.t('PasswordMust')}:
                            </Text>
                            <AntDesign style={styles.tinyLogo} name="checkcircle" color={'#aad8d3'} style={{marginLeft:'10%',marginTop:'5%',fontSize:13,fontFamily:'Battambang-Bold',}}>
                                <Text style={{fontSize:14,fontFamily:'Battambang-Bold',color:'#cae4db'}}>
                                {'  '}{I18n.t('Atleast5Characters')}
                                </Text>
                            </AntDesign>
                            <AntDesign style={styles.tinyLogo} name="checkcircle" color={'#aad8d3'} style={{marginLeft:'10%',fontSize:13,fontFamily:'Battambang-Bold'}}>
                                <Text style={{paddingLeft:10,fontSize:14,fontFamily:'Battambang-Bold',color:'#cae4db'}}>
                                {'  '}{I18n.t('IncludeCapitaLetters')}
                                </Text>
                            </AntDesign>
                            <AntDesign style={styles.tinyLogo} name="checkcircle" color={'#aad8d3'} style={{marginLeft:'10%',fontSize:13,fontFamily:'Battambang-Bold'}}>
                                <Text style={{fontSize:14,fontFamily:'Battambang-Bold',color:'#cae4db'}}>
                                {'  '}{I18n.t('IncludeLowercaseLetters')}
                                </Text>
                            </AntDesign>
                            <AntDesign style={styles.tinyLogo} name="checkcircle" color={'#aad8d3'} style={{marginLeft:'10%',fontSize:13,fontFamily:'Battambang-Bold'}}>
                                <Text style={{fontSize:14,fontFamily:'Battambang-Bold',color:'#cae4db'}}>
                                {'  '}{I18n.t('IncludeNumbers')}
                                </Text>
                            </AntDesign>
                            <AntDesign style={styles.tinyLogo} name="checkcircle" color={'#aad8d3'} style={{marginLeft:'10%',fontSize:13,fontFamily:'Battambang-Bold'}}> 
                                <Text style={{fontSize:14,fontFamily:'Battambang-Bold',color:'#cae4db'}}>
                                    {'  '}{I18n.t('AndDoNotEnter')}
                                </Text>
                            </AntDesign>
                        </View> 
                        <View style={styles.formContent}>
                            <TouchableOpacity style={styles.footer}
                                onPress={() => this.handleValidatePassword()} >
                                <Text style={styles.ready}>{I18n.t('buttonDone')}</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>    
                </ScrollView>
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
        height:'100%'
    },  
    upBox:{
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
        flex: 0.6,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        top:10,
    },

    MeassageTitle:{
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        fontFamily:'Battambang-Bold',
        margin:'10%',
        marginTop:'0%',
        marginBottom:'5%',

    },
    inputBox:{
        flex:0.08,
        flexDirection:"row",
        borderBottomColor: '#ffffff',
        borderBottomWidth: 1,
        fontFamily:'Battambang-Bold', 
        marginLeft:"10%",
        marginRight:"10%"
    },
    footer:{
        width:'100%',
        paddingVertical: 10,
        flexDirection: 'row',
        backgroundColor: '#fb3640',
        justifyContent: 'center',
        alignItems: 'center',
        position:'absolute',
        bottom:"0%",
        alignSelf:'flex-end'
    },
    ready:{
        fontSize: 18,
        color:  'white',
        fontFamily:'Battambang-Bold',
    }, 
});
  