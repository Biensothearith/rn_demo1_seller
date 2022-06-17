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
import { colors,images } from '../Assets'
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
            console.log('error', error);
        }
    };
    componentDidMount(){
        this.getUserStorage()
    }
    render(){
        const {userStorage} = this.state
        const {user} = this.props
        return(
            <>
                <View style={styles.container}>  
                    <View style={styles.inner}>
                        <View style={styles.btnBack}>
                            <TouchableOpacity onPress={()=>{NavigationService.navigate(NAV_TYPES.MSTSHOP)}}>
                                <MaterialIcons
                                    style={{color:colors.gray_dark,marginRight:'20%',fontSize:33}} name="keyboard-arrow-left"> 
                                </MaterialIcons>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.benner}>
                            <Text style={{fontSize:22, color:colors.gray_dark,fontFamily:'Battambang-Bold'}}>
                                {I18n.t('ManageAccounts')}
                            </Text>
                        </View>   
                        <View style={styles.btnBack}>

                        </View>
                    </View>
                    <View flex={0.01}
                        style={{
                            borderBottomColor: colors.gray_dark,
                            borderBottomWidth: 1, Top:50,
                        }}
                    />
                    <TouchableOpacity style={styles.branch}
                        onPress={()=>{NavigationService.navigate(NAV_TYPES.CREDITDETAIL)}}>
                       <View style={styles.ListTitleBox}>
                            <Text style={styles.ListTitle}>
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
                                {I18n.t('PhoneNumber')}
                            </Text>
                        </View>
                        <View style={styles.iconBox}>
                            {userStorage && userStorage.phone &&
                                <Text style={styles.RightTitle}>
                                    {userStorage.phone}
                                </Text>
                            }    
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.branch}
                        onPress={()=>{NavigationService.navigate(NAV_TYPES.CREDITDETAIL)}}>
                        <View style={styles.ListTitleBox}>
                            <Text style={styles.ListTitle}>
                                {I18n.t('bank')}
                            </Text>
                        </View>
                        <View style={styles.iconBox}>
                            {userStorage && userStorage.bankName &&
                                <Text style={styles.RightTitle}>
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
                            {userStorage && userStorage.bankAccountName &&
                                <Text style={styles.RightTitle}>
                                    {userStorage.bankAccountName}
                                </Text>
                            }
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.branch}
                        onPress={()=>{NavigationService.navigate(NAV_TYPES.CREDITDETAIL)}}>
                        <View style={styles.ListTitleBox}>
                            <Text style={styles.ListTitle}>
                                {I18n.t('BankNumber')}
                            </Text>
                        </View>
                        <View style={styles.iconBox}>
                            {userStorage && userStorage.bankAccountNumber &&
                                <Text style={styles.RightTitle}>
                                    {userStorage.bankAccountNumber}
                                </Text>
                            }
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
        backgroundColor: 'white', 
        position:'relative'
    },
    branch:{
        padding:13,
        flexDirection:'row',
        borderBottomColor:colors.gray_ligth,
        borderBottomWidth:1,
    },
    inner:{
        flex: 0.15,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop:Platform.OS == 'ios' ? '10%':'5%'
    },
    benner: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnBack:{
        flex: 0.2,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
    },
    ListTitleBox:{
        flex:0.5,
        flexDirection:'row',
        alignItems:'center',
    },
    iconBox:{
        flex:0.45,
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'flex-end',
        marginEnd:-15,
    },
    ListTitle:{
       color:colors.gray_dark,
       fontSize:14,
       marginLeft:5,
    },
    RightTitle:{
        color:"grey",
        fontSize:12,
        marginLeft:30,
     },
  });
  