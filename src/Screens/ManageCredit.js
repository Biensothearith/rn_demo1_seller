import React,{Component} from 'react'
import {
    Text,
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    Platform,
} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes'
import AsyncStorage from "@react-native-community/async-storage";
import { color } from 'react-native-reanimated'
import I18n from "../Service/Translate";
export default class ManageCredit extends Component{
    constructor(prop){
        super(prop)
        this.state={
        
        } 
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        const {userStorage,profilePhoto} = this.state
        const {user} = this.props
        if(nextProps.user.updateInformation && nextProps.user.updateInformation !== user.updateInformation){
          console.log('nextProps.user.updateInformation', nextProps.user.updateInformation);
          var newUser = {
              ...userStorage,
          }
        }
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
    componentDidMount(){
        this.getUserStorage()
    }
    render(){
        const {dataInput, lang,profilePhoto,userStorage, profileUpdating} = this.state
        const {user} = this.props
        return(
            <>
                <View style={styles.container}>  
                    <View style={styles.inner}>
                        <View style={styles.btnBack}>
                            <TouchableOpacity onPress={()=>{NavigationService.navigate(NAV_TYPES.MSTSHOP)}}>
                                <MaterialIcons
                                    style={{color:'#02475e',marginRight:'20%',fontSize:33}} name="keyboard-arrow-left"> 
                                </MaterialIcons>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.benner}>
                            <Text style={{fontSize:22, color:'#02475e',fontFamily:'Battambang-Bold'}}>
                                {/* គ្រប់គ្រងគណនី */}
                                {I18n.t('ManageAccounts')}
                            </Text>
                        </View>   
                        <View style={styles.btnBack}>

                        </View>
                    </View>
                    <View flex={0.01}
                        style={{
                            borderBottomColor: '#02475e',
                            borderBottomWidth: 1, Top:50,
                        }}
                    />
                    <TouchableOpacity style={styles.branch}
                        onPress={()=>{NavigationService.navigate(NAV_TYPES.CREDITDETAIL)}}>
                       <View style={styles.ListTitleBox}>
                            <Text style={styles.ListTitle}>
                                {/* ឈ្មោះគណនី */}
                                {I18n.t('AccountName')}
                            </Text>
                        </View>
                        <View style={styles.iconBox}>
                            {userStorage && userStorage.name > 0 &&
                                <Text style={styles.RightTitle}>
                                        {userStorage.name}
                                    </Text>
                            }
                        
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.branch}
                        onPress={()=>{NavigationService.navigate(NAV_TYPES.CREDITDETAIL)}}>
                        <View style={styles.ListTitleBox}>
                            <Text style={styles.ListTitle}>
                                {/* លេខទូរសព្ទ័ */}
                                {I18n.t('PhoneNumber')}
                            </Text>
                        </View>
                        <View style={styles.iconBox}>
                            {userStorage && userStorage.phone &&
                                <Text style={styles.RightTitle}>
                                    {/* 0965054500 */}
                                    {userStorage.phone}
                                </Text>
                            }    
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.branch}
                        onPress={()=>{NavigationService.navigate(NAV_TYPES.CREDITDETAIL)}}>
                        <View style={styles.ListTitleBox}>
                            <Text style={styles.ListTitle}>
                                {/* ឈ្មោះស្ថាប័ន​​ធនាគា */}
                                {I18n.t('bank')}
                            </Text>
                        </View>
                        <View style={styles.iconBox}>
                            {/* <Text style={styles.RightTitle}>ABA</Text> */}
                            {userStorage && userStorage.bankName &&
                                <Text style={styles.RightTitle}>
                                    {/* 0965054500 */}
                                    {userStorage.bankName}
                                </Text>
                            }
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.branch}
                        onPress={()=>{NavigationService.navigate(NAV_TYPES.CREDITDETAIL)}}>
                        <View style={styles.ListTitleBox}>
                            <Text style={styles.ListTitle}>
                                
                                {I18n.t('AccountName')}
                            </Text>
                        </View>
                        <View style={styles.iconBox}>
                            {/* <Text style={styles.RightTitle}>MEASSOTHEA</Text> */}
                            {userStorage && userStorage.bankAccountName &&
                                <Text style={styles.RightTitle}>
                                    {/* 0965054500 */}
                                    {userStorage.bankAccountName}
                                </Text>
                            }
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.branch}
                        onPress={()=>{NavigationService.navigate(NAV_TYPES.CREDITDETAIL)}}>
                        <View style={styles.ListTitleBox}>
                            <Text style={styles.ListTitle}>
                                {/* លេខគណនី​​ធនាគា */}
                                {I18n.t('BankNumber')}
                            </Text>
                        </View>
                        <View style={styles.iconBox}>
                            {/* <Text style={styles.RightTitle}>049999499</Text> */}
                            {userStorage && userStorage.bankAccountNumber &&
                                <Text style={styles.RightTitle}>
                                    {/* 0965054500 */}
                                    {userStorage.bankAccountNumber}
                                </Text>
                            }
                        </View>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={styles.branch}
                        onPress={()=>{NavigationService.navigate(NAV_TYPES.BRANCH)}}>
                        <View style={styles.ListTitleBox}>
                            <Text style={styles.ListTitle}>លុបគណនី</Text>
                        </View>
                        <View style={styles.iconBox}>
                            <Text style={styles.ListTitle}>១១ , ឧសភា , ២០២១</Text>
                        </View>
                    </TouchableOpacity> */}
                </View>
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
    branch:{
        // flex: 0.08,
        // flexDirection:'row',
        // borderBottomColor:'#02475e',
        // borderBottomWidth:1,
        padding:13,
        // height:50,
        flexDirection:'row',
        borderBottomColor:'#02475e',
        borderBottomWidth:1,
    },
    inner:{
        flex: 0.15,
        flexDirection: 'row',
        justifyContent: 'center',
        //backgroundColor: 'yellow',
        marginTop:Platform.OS == 'ios' ? '10%':'5%'
    },
    benner: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        // margin: 10,
        // backgroundColor:'red',
    },
    btnBack:{
        flex: 0.2,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor: 'red',
    },
    // headerTitle:{
    //     flex: 0.1,
    //     justifyContent:'center',
    //     alignItems:'center',
    // },
    ListTitleBox:{
        flex:0.5,
        // height:50,
        flexDirection:'row',
        alignItems:'center',
        // backgroundColor:'red'
    },
    iconBox:{
        flex:0.45,
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'flex-end',
        marginEnd:-15,
        // backgroundColor:'yellow'
    },
    ListTitle:{
       color:"#02475e",
       fontSize:14,
       marginLeft:5,
       fontFamily:'Battambang-Bold',
    },
    RightTitle:{
        color:"grey",
        fontSize:12,
        marginLeft:30,
        fontFamily:'Battambang-Bold',
     },
  });
  