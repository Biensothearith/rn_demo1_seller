import React,{Component} from 'react'
import {Text,StyleSheet,Image,View,TouchableOpacity,Alert, Platform} from 'react-native'
import  Loading  from "../Components/Loading";
import I18n from "../Service/Translate";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes'
import { color } from 'react-native-reanimated'
import moment from 'moment';
export default class ResultPackage extends Component{
    constructor(prop){
        super(prop)
        this.state = {
            detailCalledDriver:[],
            date:false
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        const {user} = this.props
        const {dataInput} = this.state
        if(nextProps.user.detailCalledDriverError && nextProps.user.detailCalledDriverError !== user.detailCalledDriverError){
            Alert.alert(I18n.t('alertWentWrong'))
        }
        if(nextProps.user.detailCalledDriver && nextProps.user.detailCalledDriver !== user.detailCalledDriver){
            console.log(nextProps.user.detailCalledDriver.length);
            if( nextProps.user.detailCalledDriver.length > 0){
                this.setState({detailCalledDriver:nextProps.user.detailCalledDriver})
            }
        }
    }
    componentDidMount(){
        //use when we need to get data from anohter screen
        const { navigation } = this.props;
        var data = navigation.getParam('data', false);
        console.log(data);
        this.props.detailCalledDriver({
            id : data.driverID,
            date : moment(data.dateTime).format("YYYY-MM-DD")
        })
        this.setState({
            date : moment(data.dateTime).format("DD-MMMM-YYYY")
        })
    }
    renderList(){
        const {detailCalledDriver} = this.state
        var result=[]
        var totalReturn= 0
        var totalProduct = 0
        var totalFee = 0
        for (let index = 0; index < detailCalledDriver.length; index++) {
            const element = detailCalledDriver[index];
            var imageStatus = []
            if(element.status == 3){
                totalReturn += element.productEN
            }else{
                totalProduct += element.productEN
            }
            totalFee += element.driverFeeKH
            if(element.status == 3){
                imageStatus.push(
                    <Image
                        style={styles.SuccessImage}
                        source={require('../Assets/images/unSuccess.jpg')}
                    />
                )
            }else if(element.status == 4){
                imageStatus.push(
                    <Image
                        style={styles.SuccessImage}
                        source={require('../Assets/images/delay-Clock.jpg')}
                    />
                )
            }else{
                imageStatus.push(
                    <Image
                        style={styles.SuccessImage}
                        source={require('../Assets/images/Income.jpg')}
                    />
                )
            }
            result.push(
                <TouchableOpacity style={styles.inner1}
                    onPress={()=>{NavigationService.navigate(NAV_TYPES.SPECAILINFODELIVERY,{data:element})}}
                    >
                    <View style={styles.bennerfirst}>
                       {imageStatus}
                    </View>
                    <View style={styles.benner2}>
                        <Text style={styles.text1}>{element.sellerAddress} - {element.receiverAddress}</Text>
                    </View>  
                    <View style={styles.benner2Price}>
                        <Text style={styles.textPrice}>{element.productEN}$</Text>
                    </View>  
                    <View style={styles.benner2Price}>
                        <Text style={styles.textPrice}>{element.driverFeeKH}៛</Text>
                    </View>       
                </TouchableOpacity>
            )
        }
        result.push(
            <View style={styles.inner1}>
                <View style={styles.image}>
                    
                </View>
                <View style={styles.bennerTotal}>
                    <Text style={styles.totalPrice}>{I18n.t('unsuccess')}</Text>
                    <Text style={styles.price} style={{marginLeft: 8,fontSize: 14,color: 'red',}}>{totalReturn}$</Text>
                </View>
                <View style={styles.bennerTotalPrice}>
                    <Text style={styles.totalPrice}>{I18n.t('totalFee')}</Text>
                    <Text style={styles.price}>{totalProduct}$</Text>
                </View>  
                <View style={styles.bennerTotalPrice}>
                    <Text style={styles.totalPrice}>{I18n.t('serviceFee')}</Text>
                    <Text style={styles.price}>{totalFee}៛</Text>
                </View>           
            </View>
        )
        return result
    }
    render(){
        const {detailCalledDriver,date} = this.state
        const {user} = this.props
        return(
            <>
            {user.pending &&
                    <Loading/>
                }
                <View style={styles.container}>
                    <View style={styles.inner}>
                        <View style={styles.btnBack}>
                            <TouchableOpacity onPress={() => NavigationService.goBack()}>
                                <MaterialIcons
                                    style={{color:'#005792',marginRight:'0%',fontSize:40}} name="keyboard-arrow-left" size={15} color={'#ffffff'}> 
                                </MaterialIcons>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.benner}>
                        <Text style={styles.text}>{I18n.t('total')} {detailCalledDriver.length} {I18n.t('package')}</Text>
                            <Text style={styles.textSmall} style={{fontFamily:'Battambang-Bold',fontSize:18,color:'#005792',}}> 
                                {date && date} 
                            </Text>  
                        </View>    
                        <View style={styles.btnBack}>

                        </View>
                    </View>
                        {this.renderList()}
                    {/* result */}
                    
                </View>
            </>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },  
    inner:{
        flex: 0.15,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginTop:Platform.OS == 'ios' ? '10%':'5%',

    },
    btnBack:{
        flex: 0.2,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor: 'red',
    },
    benner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        // backgroundColor:'yellow'
    },
    text:   {
     fontSize: 22,
     color: '#005792',
     fontFamily:'Battambang-Bold',
    },
    textPrice:{
        fontSize: 14,
        color: 'red',},
    inner1:{
        flex:Platform.OS == 'ios' ? 0.1:0.06,
        flexDirection: 'row',
        borderColor: '#dedbd3',
        borderTopWidth: 1,
    },
    bennerfirst: {
        flex: 0.16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image1: {
        flex: 0.16,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 0.16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    benner2: {
        flex: 0.44,
        justifyContent: 'center',
    },
    benner2Price: {
        flex: Platform.OS == 'ios' ? 0.25:0.25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    benner3: {
        flex: 0.44,
        justifyContent: 'center',
    },
    bennerTotal: {
        flex: 0.44,
        //justifyContent: 'center',
    },
    bennerPrice: {
        flex: 0.20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bennerTotalPrice: {
        flex: Platform.OS == 'ios' ? 0.25:0.25,
        //justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    text:{
        fontSize: 20,
        color: '#005792',
        fontFamily:'Battambang-Bold',
    },
    text1:{
        fontSize: 14,
        color: '#005792',
        fontFamily:'Battambang-Bold',
    },
    totalPrice:{
        marginTop:10,
        fontSize: 14,
        color: '#005792',
        fontFamily:'Battambang-Bold',
    },
    price:{
        fontSize: 14,
        color: 'red',
    },
    centerLogo: {
        flex: 1,
        width: 100,
        height: 100,
    },
    SuccessImage: {
        width: 30,
        height: 30,
    },
    notSuccessImage: {
        width: 25,
        height: 25,
        marginLeft: 15,
    },
  });
  