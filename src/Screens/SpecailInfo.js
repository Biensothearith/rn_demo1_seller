import React,{Component} from 'react'
import {
    Text,
    StyleSheet,
    Image,
    View,
    TouchableOpacity,SafeAreaView, Platform
} from 'react-native'
import moment from 'moment'
import {STATUS_TEXT} from "../Modules/app/config"
import  Loading  from "../Components/Loading";
import I18n from "../Service/Translate";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes'
import { totalDetailPrice } from "../Utils/totalDetailPrice";

export default class Home extends Component{
   
    constructor(prop){
        super(prop)
        this.state = {
            dataInput:false,
        }
    }
    
  
    componentDidMount(){
        //use when we need to get data from anohter screen
        const { navigation } = this.props;
        var data = navigation.getParam('data', false);
        console.log(data);
        this.setState({
            dataInput:data[0],
        })
    }
    renderTotal(){
        const {dataInput} = this.state
        const {user} = this.props
        var rate = false
        if(user && user.siteInformation && user.siteInformation.length > 0){
            rate = user.siteInformation[0].dollarRate
        }
        return totalDetailPrice(dataInput.driverFeeKH, dataInput.productEN, rate)
    }
    render(){
        const {dataInput} = this.state
        const {user} = this.props
        return(
            <>
            {user.pending &&
                    <Loading/>
                }
                    <View style={styles.container}>
                        <View style={styles.inner}>
                            <View style={styles.btnBack}>
                                <TouchableOpacity onPress={()=>{NavigationService.navigate(NAV_TYPES.FLOW)}}>
                                    <MaterialIcons
                                        style={{color:'black',marginRight:'-12%',fontSize:33}} name="keyboard-arrow-left"> 
                                    </MaterialIcons>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.benner}>
                                <Text style={styles.headerTitle} fontFamily={'Battambang-Bold'}> {I18n.t('ShippingDetails')} </Text>
                            </View>    
                            <View style={styles.btnBack}>

                            </View>
                        </View>
                    
                        <View style={styles.row} >
                        <View style={styles.col1} >
                                <Text style={styles.titleDetail}>{I18n.t('ItemCode')}</Text>
                        </View>
                        <View style={styles.col2}>
                                <Text style={styles.titleDetail}>៖​ #{dataInput && dataInput.id}</Text>
                        </View>
                        </View>
                        <View style={styles.row} >
                            <View style={styles.col1} >
                                <Text style={styles.titleDetail}>{I18n.t('date')}</Text>
                            </View>
                            <View style={styles.col2}>
                                <Text style={styles.titleDetail}>៖ {dataInput && moment(dataInput.dateTime).format("DD-MMMM-YYYY")}</Text>
                            </View>
                        </View>
                        <View style={styles.row} >
                            <View style={styles.col1} >
                                <Text style={styles.titleDetail} >{I18n.t('ProductType')}</Text>
                            </View>
                            <View style={styles.col2}>
                                <Text style={styles.titleDetail} >៖ {dataInput && dataInput.productType}</Text>
                            </View>
                        </View>
                        <View style={styles.row} >
                            <View style={styles.col1} >
                                <Text numberOfLines = {1} style={styles.titleDetail} >{I18n.t('shop')}</Text>
                            </View>
                            <View style={styles.col2}>
                                <Text style={styles.titleDetail} >៖ {dataInput && dataInput.storeName}</Text>
                            </View>
                        </View>
                        <View style={styles.row} >
                            <View style={styles.col1} >
                                <Text style={styles.titleDetail} >{I18n.t('SenderNumber')}</Text>
                            </View>
                            <View style={styles.col2}>
                                <Text style={styles.titleDetail} >៖ {dataInput && dataInput.senderPhone}</Text>
                            </View>
                        </View>
                        <View style={styles.row} >
                            <View style={styles.col1} >
                                <Text style={styles.titleDetail} >{I18n.t('receiveAddress')}</Text>
                            </View>
                            <View style={styles.col2}>
                                <Text style={styles.titleDetail} >៖ {dataInput && dataInput.receiverAddress}</Text>
                            </View>
                        </View>
                        <View style={styles.row} >
                            <View style={styles.col1} >
                                <Text style={styles.titleDetail} >{I18n.t('receiveNumber')}</Text>
                            </View>
                            <View style={styles.col2}>
                                <Text style={styles.titleDetail} >៖ {dataInput && dataInput.receiverPhone}</Text>
                            </View>
                        </View>
                        <View style={styles.row} >
                            <View style={styles.col1} >
                                <Text style={styles.titleDetail}>{I18n.t('driverName')}</Text>
                            </View>
                            <View style={styles.col2}>
                                <Text style={styles.titleDetail} >៖ {dataInput && dataInput.driverName}</Text>
                            </View>
                        </View>
                        <View style={styles.row} >
                            <View style={styles.col1} >
                                <Text style={styles.titleDetail} >{I18n.t('driverNumber')}</Text>
                            </View>
                            <View style={styles.col2}>
                                <Text style={styles.titleDetail}>៖ {dataInput && dataInput.driverPhone}</Text>
                            </View>
                        </View>
                        <View style={styles.row} >
                            <View style={styles.col1} >
                                <Text style={styles.titleDetail} >{I18n.t('price')}</Text>
                            </View>
                            <View style={styles.col2}>
                                <Text style={styles.titleDetail} >៖ {dataInput && dataInput.productEN}$</Text>
                            </View>
                        </View>
                        <View style={styles.row} >
                            <View style={styles.col1} >
                                <Text style={styles.titleDetail} >{I18n.t('serviceFee')}</Text>
                            </View>
                            <View style={styles.col2}>
                                <Text style={styles.titleDetail} >៖ { dataInput && dataInput.driverFeeKH}៛</Text>
                                {/* 6000 */}
                                    
                            </View>
                        </View>
                        <View style={styles.row} >
                            <View style={styles.col1} >
                                <Text style={styles.titleDetail} >{I18n.t('totalFee')}</Text>
                            </View>
                            <View style={styles.col2}>
                                <Text style={styles.titleDetail} >៖ { dataInput && this.renderTotal()}
                                {/* 11.5$ */}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.row} >
                            <View style={styles.col1} >
                                <Text style={styles.titleDetail} >{I18n.t('status')}</Text>
                            </View>
                            <View style={styles.col2}>
                                <Text style={styles.titleDetail} >៖​ <Text style={dataInput && {color:STATUS_TEXT[dataInput.status].color}}>{dataInput && STATUS_TEXT[dataInput.status].text}</Text></Text>
                                {/* កំពុងដឹក */}
                            </View>
                        </View>
                        <TouchableOpacity style={styles.footer}
                        onPress={() => {NavigationService.navigate(NAV_TYPES.DELIVERYSTATUS,{data: dataInput})}}>
                            <Text style={styles.check} >{I18n.t('buttonCheck')}</Text>
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
        position: 'relative',
    },
    inner:{
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginTop:Platform.OS == 'ios' ? '8%':'0%'

    },
    benner: {
        flex: 0.8,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    btnBack:{
        flex: 0.2,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor: 'red',
    },

    headerTitle:   {
     fontSize: 20,
     color: 'black',
     fontFamily:'Battambang-Bold',
    },
    row:{
        flex: 0.05,
        flexDirection: 'row',
        marginLeft: 30,
        marginRight: 30,
        marginTop:Platform.OS == 'ios' ? '1%':'0%'

    },
    col1:{
        flex: 0.55,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    col2:{
        flex: 0.45,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    titleDetail:{
        fontSize: 16,
        color:'black',
        fontFamily:'Battambang-Bold'
    },
    status:{
        fontSize: 16,
        color: '#32CD32',
        // color: '#c4fb6d',
        
        fontFamily:'Battambang-Bold',
    },
    footer:{
        width: '100%',
        height: 50,
        flexDirection: 'row',
        backgroundColor: '#005792',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
    },
    check:{
        fontSize: 18,
        color: 'white',
        fontFamily:'Battambang-Bold'
    },
  });
  