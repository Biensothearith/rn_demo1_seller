import React,{Component} from 'react'
import {
    Text,
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
} from 'react-native'
import {STATUS_TEXT} from "../Modules/app/config"
import I18n from "../Service/Translate";
import  Loading  from "../Components/Loading";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes'
import moment from 'moment';
import { totalDetailPrice } from "../Utils/totalDetailPrice";
export default class DetailDriver extends Component{
   
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
            dataInput:data,
        })
    }
    renderTotal(){
        const {dataInput} = this.state
        const {user} = this.props
        var rate = false
        console.log('user.siteInformation', user.siteInformation);
        console.log('this.props.user',this.props.user);
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
                            <TouchableOpacity onPress={()=>{NavigationService.goBack()}}>
                                <MaterialIcons
                                    style={{color:'black',marginRight:'-12%',fontSize:33}}
                                     name="keyboard-arrow-left"> 
                                </MaterialIcons>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.benner}>
                            <Text style={styles.headerTitle} fontFamily={'Battambang-Bold'}> 
                                {I18n.t('CallDetails')}
                            </Text>
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
                            <Text style={styles.titleDetail} >{I18n.t('shop')}</Text>
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
                            <Text style={styles.titleDetail} >{I18n.t('receiveNumber')}</Text></View>
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
                        </View>
                    </View>
                    <View style={styles.row} >
                        <View style={styles.col1} >
                            <Text style={styles.titleDetail} >{I18n.t('totalFee')}</Text>
                        </View>
                        <View style={styles.col2}>
                            <Text style={styles.titleDetail} >៖ { dataInput && dataInput.totalGetEN}$ </Text>
                        </View>
                    </View>
                    <View style={styles.row} >
                        <View style={styles.col1} >
                            <Text style={styles.titleDetail} >{I18n.t('status')}</Text>
                        </View>
                        <View style={styles.col2}>
                            <Text style={styles.titleDetail} >៖​ <Text style={dataInput && {color:STATUS_TEXT[dataInput.status].color}} >{dataInput && STATUS_TEXT[dataInput.status].text}</Text></Text>
                        </View>
                    </View>
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
    },
    col1:{
        flex: 0.35,
        flexDirection: 'column',
        justifyContent: 'center',
    },
    col2:{
        flex: 0.65,
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
        fontFamily:'Battambang-Bold',
    },
    
  });
  