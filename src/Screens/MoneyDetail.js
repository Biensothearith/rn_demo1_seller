import React,{Component} from 'react'
import {
    Text,
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    Alert,
    Platform
} from 'react-native'
import {STATUS_TEXT} from "../Modules/app/config"
import moment from 'moment';
import I18n from "../Service/Translate";
import  Loading  from "../Components/Loading";
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes'
import { color } from 'react-native-reanimated'
export default class MoneyDetail extends Component{
   
    constructor(prop){
        super(prop)
        this.state = {
            dataInput:false,
            detailTotalSuccess:false
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        const {user} = this.props
        const {dataInput} = this.state
        if(nextProps.user.detailTotalSuccessError && nextProps.user.detailTotalSuccessError !== user.detailTotalSuccessError){
            Alert.alert(I18n.t('alertWentWrong'))
        }
        if(nextProps.user.detailTotalSuccess && nextProps.user.detailTotalSuccess !== user.detailTotalSuccess){
            
            console.log(nextProps.user.detailTotalSuccess);
            if( nextProps.user.detailTotalSuccess.length > 0){
                this.setState({detailTotalSuccess:nextProps.user.detailTotalSuccess[0]})
            }
        }
    }
    componentDidMount(){
        //use when we need to get data from anohter screen
        const { navigation } = this.props;
        var data = navigation.getParam('data', false);
        console.log(data);
        this.setState({
            dataInput:data,
        })
        this.props.detailTotalSuccess({      //function from modals/index has props.
            id : data.driverID,
            date : moment(data.dateTime).format("YYYY-MM-DD")
        })
    }

    render(){
        const {dataInput,detailTotalSuccess} = this.state
        const {user} = this.props
        return(
            <>
            {user.pending &&
                    <Loading/>
                }
                <View style={styles.container}>

                    <TouchableOpacity style={styles.branchHeader}
                        onPress={()=>{NavigationService.navigate(NAV_TYPES.BRANCH)}}>
                       <View style={styles.HeaderTitleBox}>
                            <Text style={styles.HeaderTitle}>{I18n.t('TotalList')}</Text>
                        </View>
                        <View style={styles.HeaderRigthBox}>
                        <Text style={styles.HeaderTitle}>{dataInput && moment(dataInput.dateTime).format("DD-MMMM-YYYY")}</Text>
                        </View>
                    </TouchableOpacity>

                    <View 
                        style={{
                            borderBottomColor: 'white',
                            borderBottomWidth: 1, Top:50,
                        }}
                    />
                    <TouchableOpacity style={styles.branch}
                        onPress={()=>{NavigationService.navigate(NAV_TYPES.BRANCH)}}>
                       <View style={styles.ListTitleBox}>
                            <Text style={styles.ListTitle}>{I18n.t('driverName')}</Text>
                        </View>
                        <View style={styles.dateBox}>
                        <Text style={styles.ListTitle}>{dataInput && dataInput.driverName}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.branch}
                        onPress={()=>{NavigationService.navigate(NAV_TYPES.BRANCH)}}>
                        <View style={styles.ListTitleBox}>
                            <Text style={styles.ListTitle}>{I18n.t('SuccessBaggage')}</Text>
                        </View>
                        <View style={styles.dateBox}>
                            <Text style={styles.ListTitle}> {detailTotalSuccess && detailTotalSuccess.countPackages} {I18n.t('package')}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.branch}
                        onPress={()=>{NavigationService.navigate(NAV_TYPES.BRANCH)}}>
                        <View style={styles.ListTitleBox}>
                            <Text style={styles.ListTitle}>{I18n.t('price')}</Text>
                        </View>
                        <View style={styles.dateBox}>
                            <Text style={styles.ListTitle}>{detailTotalSuccess && detailTotalSuccess.totalGetEN}$</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.branch}
                        onPress={()=>{NavigationService.navigate(NAV_TYPES.BRANCH)}}>
                        <View style={styles.ListTitleBox}>
                            <Text style={styles.ListTitle}>{I18n.t('serviceFee')}</Text>
                        </View>
                        <View style={styles.dateBox}>
                            <Text style={styles.ListTitle}>{detailTotalSuccess && detailTotalSuccess.driverFeeKH}៛</Text>
                        </View>
                    </TouchableOpacity>
                    <View
                        style={{
                            borderBottomColor: 'white',
                            borderBottomWidth: 1, Top:50,
                        }}
                    />
                    <View style={styles.bill}>
                        <Text style={{textAlign:'center',fontSize:17,color:"white",
                            fontFamily:'Battambang-Bold',top:10}}>{I18n.t('PayForItem')}
                        </Text>
                        <Text style={{textAlign:'center',fontSize:40,color:"white",
                            fontFamily:'Battambang-Bold',}}>{detailTotalSuccess && detailTotalSuccess.totalGetEN}$
                        </Text>
                        <Text style={{textAlign:'center',fontSize:17,color:"white",
                            fontFamily:'Battambang-Bold'}}>{I18n.t('serviceFee')}
                        </Text>
                        <Text style={{textAlign:'center',fontSize:40,color:"white",
                            fontFamily:'Battambang-Bold'}}>{detailTotalSuccess && detailTotalSuccess.driverFeeKH}៛
                        </Text>
                    </View>
                    <TouchableOpacity style={styles.ready}
                        onPress={() => NavigationService.navigate(NAV_TYPES.MSTSHOP)} >
                        <Text style={styles.Title}>{I18n.t('buttonDone')}</Text>
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
    branchHeader:{
        flex: 0.08,
        flexDirection:'row',
        marginTop:20,
        marginTop:Platform.OS == 'ios' ? '10%':'5%',
    },
    HeaderTitleBox:{
        flex:0.35,
        flexDirection:'row',
        alignItems:'center',

    },
    HeaderTitle:{
        color:"white",
        fontSize:17,
        marginLeft:30,
        fontFamily:'Battambang-Bold',
    },
    HeaderRigthBox:{
        flex:0.65,
        flexDirection:'row',
        alignItems:'center',
        fontFamily:'Battambang-Bold',
        justifyContent:'flex-end',
        marginEnd:20,
    },
    branch:{
        flex: 0.07,
        flexDirection:'row',
    },
    ListTitleBox:{
        flex:0.55,
        flexDirection:'row',
        alignItems:'center',
    },
    dateBox:{
        flex:0.45,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
        marginEnd:20,
    },
    ListTitle:{
       color:"white",
       fontSize:14,
       marginLeft:20,
       fontFamily:'Battambang-Bold',
    },
    bill:{
        flex:0.6,
        alignItems:'center',
    },
    ready:{
        width:'100%',
        height:50,
        flexDirection: 'row',
        backgroundColor: '#fb3640',
        justifyContent:'center',
        alignItems: 'center',
        position:'absolute',
        bottom:0,
    },
    Title:{
        fontSize: 20,
        color:  'white',
        fontFamily:'Battambang-Bold',
    },
  });
  