import React,{Component} from 'react'
import {
    Text,
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    Button,
    Modal,
    Alert,
    Platform,
} from 'react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import mediaPicker from "../Service/mediaPicker";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes'
import requestPermission from '../Utils/requestPermission'
import {PERMISSIONS} from 'react-native-permissions';
import AsyncStorage from "@react-native-community/async-storage";
import { PROFILE_URL } from "../Modules/app/config";
import { color } from 'react-native-reanimated'
import I18n from "../Service/Translate";


var hobbies = [
    {label: "ភាសាខ្មែរ", value: "ភាសាខ្មែរ"},
    {label: "English", value: "English"},
    {label: "chinese", value:"chinese"},
  ];
export default class MSTshop extends Component{
   
    constructor(){
        super()
        this.state={
            show:false,
            lang:'en',
            profilePhoto:false,
            profileUpdating:false,
            GetProfile: false,
            userStorage:{}
        } 
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        const {userStorage,profilePhoto} = this.state
        const {user} = this.props
        if(nextProps.user.updateProfile && nextProps.user.updateProfile !== user.updateProfile){
          console.log('nextProps.user.updateProfile', nextProps.user.updateProfile);
          var newUser = {
              ...userStorage,
              image: nextProps.user.updateProfile
          }
          this.setNewUserData(newUser)
        }
      }
    handleUserLogout(){
        this.props.userLogout()
        //alert('success')
    }

    getUserStorage = async () => {
        try {
            const value = await AsyncStorage.getItem('@DataLogin');
            if (value !== null) {
                // We have data!!
                console.log('value', JSON.parse(value));
                if(value){
                    this.setState({
                        userStorage: JSON.parse(value).data
                    })
                }
            }else{
                console.log('value', false);
                return
            }
        } catch (error) {
            // Error retrieving data
            console.log('error', error);
        }
    };
    setNewUserData = async (newUser) => {
        try {
            const value = await AsyncStorage.getItem('@DataLogin');
            if (value !== null) {
                // We have data!!
                console.log('value', JSON.parse(value));
                if(value){
                    var userStorage = JSON.parse(value)
                    userStorage = {
                        ...userStorage,
                        data: newUser
                    }
                    AsyncStorage.setItem('@DataLogin', JSON.stringify(userStorage))
                }
            }
        } catch (error) {
            // Error retrieving data
            console.log('error', error);
        }
    };
    selectPhoto = () => {
        Alert.alert(
            I18n.t('changeImage'),
            I18n.t('picOrCamera'),
            [
                {
                text: I18n.t('Camera'),
                onPress: () => this.openCamera(),
                },
                {
                text:  I18n.t('Picture'),
                onPress: () => this.openLibrary(),
                },
            ],
            { cancelable: false }
        );
    };
    openCamera(){
    var this_ = this;
    const REQUESTED = Platform.OS === "ios" ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA
    requestPermission(REQUESTED, function (results) {
        if(results){
            mediaPicker.openCamera(this_.onSelect);
        }
    })
    }
    openLibrary(){
    var this_ = this;
    const REQUESTED = Platform.OS === "ios" ? PERMISSIONS.IOS.PHOTO_LIBRARY : PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE
    requestPermission(REQUESTED, function (results) {
        if(results){
            mediaPicker.selectPhoto(this_.onSelect);
        }
    })
    }
    onSelect = photo => {
    const { GetProfile, userStorage } = this.state
    this.setState({ profilePhoto: photo, profileUpdating:true });
    this.props.updateProfile({
        oldImageName: userStorage && userStorage.image ? userStorage.image: '',
        newImageData: "data:image/png;base64,"+photo.data
    })
    };
    componentDidMount(){
        console.log('this.props', this.props);
        this.setState({
            lang:I18n.locale
        }) 
        console.log('I18n.locale', I18n.locale); 
        this.getUserStorage()
    }
    handleChangeLanguage(lang){
        this.props.setLocale({
            lang:lang,
            nav:NAV_TYPES.LOADING
        });
    }
    render(){
        const {dataInput, lang,profilePhoto,userStorage, profileUpdating} = this.state
        // console.log('Image', PROFILE_URL+userStorage.image)
        const {user} = this.props
        return(
            <>
                <View style={styles.container}>
                    <View style={styles.ContactBox}>
                        <View style={styles.logoBox}>
                            <TouchableOpacity onPress={this.selectPhoto} style={styles.BoxImage}>
                                <Image
                                    style={styles.MSTlogo}
                                    source={
                                    profilePhoto && profilePhoto.data ? 
                                        { uri: "data:image/png;base64,"+profilePhoto.data } 
                                    : 
                                    userStorage && userStorage.image ?
                                        { uri: PROFILE_URL+userStorage.image } 
                                        :
                                        require('../Assets/images/profile.jpg')
                                    }
                                />  
                            </TouchableOpacity>
                        </View>
                        <View style={styles.TitleBox}>
                            <View style={styles.TitleRow}>
                                <Text style={{fontSize:12,color:'white',top:15,fontFamily:'Battambang-Bold',}}>
                                    {I18n.t('welcome')}
                                </Text>
                            </View>
                            <View style={styles.TitleRow1}>
                                {(userStorage && userStorage.name) &&
                                    <Text style={{fontSize:16,color:'white',fontWeight:'bold'}}>
                                        {userStorage.name}
                                    </Text>
                                }
                            </View>
                            <View style={styles.TitleRow2}>
                                {userStorage && userStorage.phone &&
                                    <Text style={{fontSize:12,color:'white',bottom:15,fontFamily:'Battambang-Bold',}}>
                                        {userStorage.phone}
                                    </Text>
                                }
                            </View>
                        </View>
                    </View>
                        <View flex={0.03}
                            style={{
                                borderBottomColor: 'white',
                                borderBottomWidth: 1, Top:50,
                            }}
                        />
                        <TouchableOpacity style={styles.branch}
                            onPress={()=>{NavigationService.navigate(NAV_TYPES.MANAGECREDIT)}}>
                            <View style={styles.ListTitleBox}>
                                <Text style={styles.ListTitle}>{I18n.t('ManageAccounts')}</Text>
                            </View>
                            <View style={styles.iconBox}>
                                <SimpleLineIcons style={{fontWeight:'bold'}} name="arrow-right" size={15} color={'#ffffff'}> </SimpleLineIcons>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.branch}
                            onPress={()=>{NavigationService.navigate(NAV_TYPES.CALLHISTORY)}}>
                            <View style={styles.ListTitleBox}>
                                <Text style={styles.ListTitle}>{I18n.t('callHistory')}</Text>
                            </View>
                            <View style={styles.iconBox}>
                                <SimpleLineIcons style={{fontWeight:'bold'}} name="arrow-right" size={15} color={'#ffffff'}> </SimpleLineIcons>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.branch}
                            onPress={()=>{NavigationService.navigate(NAV_TYPES.REQUEST_BOOKING)}}>
                            <View style={styles.ListTitleBox}>
                                <Text style={styles.ListTitle}>{I18n.t('waitingDriver')}</Text>
                            </View>
                            <View style={styles.iconBox}>
                                <SimpleLineIcons style={{fontWeight:'bold'}} name="arrow-right" size={15} color={'#ffffff'}> </SimpleLineIcons>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.branch}
                            onPress={()=>{NavigationService.navigate(NAV_TYPES.MONEY)}}>
                            <View style={styles.ListTitleBox}>
                                <Text style={styles.ListTitle}>{I18n.t('PaymentHistory')}</Text>
                            </View>
                            <View style={styles.iconBox}>
                                <SimpleLineIcons style={{fontWeight:'bold'}} name="arrow-right" size={15} color={'#ffffff'}> </SimpleLineIcons>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.branch}
                            onPress={()=>{NavigationService.navigate(NAV_TYPES.SITEINFORMATION)}}>
                            <View style={styles.ListTitleBox}>
                                <Text style={styles.ListTitle}>{I18n.t('PoliciesTerms')}</Text>
                            </View>
                            <View style={styles.iconBox}>
                                <SimpleLineIcons style={{fontWeight:'bold'}} name="arrow-right" size={15} color={'#ffffff'}> </SimpleLineIcons>
                            </View>
                        </TouchableOpacity>
                        
                        <TouchableOpacity style={styles.branch}
                            onPress={()=>{this.setState({show:true})}}>
                            <View style={styles.ListTitleBox}>
                                <Text style={styles.ListTitle}>{I18n.t('Languages')}</Text>
                                <Modal transparent={true} visible={this.state.show}>
                                        <View style={{backgroundColor: 'rgba(0,0,0,0.50)',flex:1,justifyContent:'center'}}>
                                            <View style={{backgroundColor:'white',marginHorizontal:40,shadowColor: "#000",shadowOffset: {
                                                width: 0,
                                                height: 6,
                                            },
                                            shadowOpacity: 0.37,
                                            shadowRadius: 7.49,
                                            elevation: 12,}}>
                                                <View style={styles.popUpTitle}>
                                                    <Text style={{fontSize:18,fontFamily:'Battambang-Bold',color:'white'}}>{I18n.t('changeLanguageTitle')}</Text>
                                                </View>
                                                <TouchableOpacity 
                                                    style={styles.listBox}
                                                    onPress={() => this.handleChangeLanguage('kh')}
                                                >
                                                    <FontAwesome name={lang == 'kh' ? 'dot-circle-o':'circle-o'} size={25} color={'#005792'}> </FontAwesome>
                                                    <Text style={styles.radioTitle}>ភាសាខ្មែរ</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity 
                                                    style={styles.listBox}
                                                    onPress={() => this.handleChangeLanguage('en')}
                                                >
                                                    <FontAwesome name={lang == 'en' ? 'dot-circle-o':'circle-o'} size={25} color={'#005792'}> </FontAwesome>
                                                    <Text style={styles.radioTitle}>English</Text>
                                                </TouchableOpacity>
                                                {/* <TouchableOpacity 
                                                    style={styles.listBox}
                                                    onPress={() => this.handleChangeLanguage('cn')}
                                                >
                                                    <FontAwesome name={lang == 'cn' ? 'dot-circle-o':'circle-o'} size={25} color={'#005792'}> </FontAwesome>
                                                    <Text style={styles.radioTitle}>Chinese</Text>
                                                </TouchableOpacity> */}
                                                <TouchableOpacity style={styles.footerBtn}
                                                    onPress={()=>{this.setState({show:false})}}>
                                                    <Text style={{fontSize:18,fontFamily:'Battambang-Bold',color:'white'}}>{I18n.t('buttonDone')}</Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </Modal>
                            </View>
                            <View style={styles.iconBox}>
                                <SimpleLineIcons style={{fontWeight:'bold'}} name="arrow-right" size={15} color={'#ffffff'}> </SimpleLineIcons>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.branch}
                            onPress={() => this.handleUserLogout()}
                            >
                            <View style={styles.ListTitleBox}>
                                <Text style={styles.ListTitle}>{I18n.t('Exit')}</Text>
                                <MaterialCommunityIcons style={{marginLeft:30}} name="arrow-right" size={25} color={'#ffffff'}> </MaterialCommunityIcons>
                            </View>
                            <View style={styles.iconBox}>
                                
                            </View>
                        </TouchableOpacity>
                </View>
            </>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#02475e',
        position:'relative'
    },
    headerTitle:{
        flex: 0.1,
        justifyContent:'center',
        alignItems:'center',
    },
    ContactBox:{
        marginTop:Platform.OS == 'ios' ? '10%':20,
        flex: 0.2,
        flexDirection:'row',
    },
    logoBox:{
        flex: 0.31,
        flexDirection:'column',
        justifyContent:'center',
        // alignItems:'flex-end',
        // left:"1%",
        maxWidth: "95%",
        maxHeight:"100%",
        paddingLeft:"2.5%",
        // backgroundColor:"yellow"
    },
    BoxImage:{
        width:'100%',
        height:'85%',
        resizeMode:'contain',
        //backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:15,
    },
    MSTlogo:{
        width:110,
        height:110,
        borderRadius:10,
        resizeMode:'contain',
    },
    TitleBox:{
        flex: 0.56,
        flexDirection:'column',
        justifyContent:'center',
        left:"10%",
        maxWidth: "95%",
        maxHeight:"100%",
    },
    TitleRow:{
        flex:0.3,
        flexDirection:'row',
        alignItems:'center',
        // backgroundColor:'red',
        textAlign:'center'
    },
    TitleRow1:{
        flex:0.4,
        flexDirection:'row',
        alignItems:'center',
    },
    TitleRow2:{
        flex:0.3,
        flexDirection:'row',
        alignItems:'center',
        // backgroundColor:'red',
    },
    branch:{
        flex: 0.08,
        flexDirection:'row',
        borderBottomColor:'white',
        borderBottomWidth:1,
    },
    ListTitleBox:{
        flex:0.9,
        flexDirection:'row',
        alignItems:'center',
    },
    iconBox:{
        flex:0.1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
    },
    ListTitle:{
       color:"white",
       fontSize:14,
       marginLeft:20,
       fontFamily:'Battambang-Bold',
    },
    HeaderTitle:{
        flex:0.25,
        flexDirection:'row',
        backgroundColor:'#ffffff',
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        borderTopEndRadius:10,
        borderTopStartRadius:10,
        borderBottomColor:'grey',
        borderBottomWidth:1,
    },
    popUpTitle:{
        // flex:0.25,
        height:65,
        flexDirection:'row',
        backgroundColor:'#005792',
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        borderBottomColor:'white',
        borderBottomWidth:1,
        
    },
    listBox:{
        backgroundColor:'white',
        height:56,
        flexDirection:'row',
        color:'white',
        paddingLeft:20,
        alignItems:'center',
        borderBottomColor:'#005792',
        borderBottomWidth:1,
    },
    radioTitle:{
        fontSize:16,
        fontFamily:'Battambang-Bold',
        marginTop:2,
        color:'#005792',
    },
    footerBtn:{
        // flex:0.10,
        height:56,
        width:'100%',
        flexDirection:'row',
        backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        // top:'63%',

    },
    HeaderImage:{
        flex: 0.3,
        height:130,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        // backgroundColor:'red'
    },
  });
  