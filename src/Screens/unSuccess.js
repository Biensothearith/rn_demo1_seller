import React,{Component} from 'react'
import {Text,StyleSheet,Image,View,TouchableOpacity,Alert,SafeAreaView, Platform} from 'react-native'
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
            report:[],
            call:false,
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        const {user} = this.props
        const {dataInput} = this.state
        if(nextProps.user.reportError && nextProps.user.reportError !== user.reportError){
            Alert.alert(I18n.t('alertWentWrong'))
        }
        if(nextProps.user.report && nextProps.user.report !== user.report){
            console.log(nextProps.user.report.length);
            // if( nextProps.user.report.length > 0){
            //     this.setState({report:nextProps.user.report})
            // }
            // NavigationService.navigate(NAV_TYPES.LOGIN, {data: dataInput})
            this.setState({
                report:nextProps.user.report,
                call:true,
            })
        }
    }
    componentDidMount(){
        // console.log(this.props);
        this.props.report({
            date: moment('2021-05-20').format("YYYY-MM-DD"),
            type: 'return',
        })
    }
    renderList(){
        const {report} = this.state
        var result=[]
        var totalReturn= 0
        var totalProduct = 0
        var totalFee = 0
        for (let index = 0; index < report.length; index++) {
            const element = report[index];
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
        if(result.length > 0){
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
        }
        return result
    }
    render(){
        const {report,call} = this.state
        const {user} = this.props
        return(
            <>
            {user.pending &&
                    <Loading/>
                }
                <SafeAreaView style={{flex:Platform.OS == 'ios' ? 1:1, backgroundColor: Platform.OS == 'ios' ? 'white':'null'}}>
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
                            <Text style={styles.text}>{I18n.t('total')} {report.length} {I18n.t('package')}</Text>
                                <Text style={styles.textSmall} style={{fontFamily:'Battambang-Bold',fontSize:14,color:'#005792',}}> {moment().format("DD-MMMM-YYYY")} </Text>  
                            </View>    
                            <View style={styles.btnBack}>

                            </View>
                        </View>
                            {this.renderList()}
                            {call && report.length == 0 &&
                                <>
                                <View style={styles.endMore}>
                                    <Image
                                    style={styles.noMoreImage}
                                    source={require('../Assets/images/EmptyIcon.png')}
                                />
                                </View>
                                <Text  style={{
                                    fontSize:22,
                                    fontFamily:'Battambang-Bold',
                                    color:'black',
                                    textAlign:'center',
                                    top:0,
                                    }}>
                                    {I18n.t('noData')}
                                </Text>
                                <Text 
                                    style={{
                                        fontSize:16,
                                        fontFamily:'Battambang-Bold',
                                        color:'black',
                                        textAlign:'center',
                                        // top:-20,
                                    }}
                                >
                                    {I18n.t('YouHaveNoData')}
                                </Text>
                            </> 
                            }
                        {/* result */}
                        
                    </View>
                </SafeAreaView>
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
    },
    text:{
     fontSize: 22,
     color: '#005792',
     fontFamily:'Battambang-Bold',
    
    },
    textPrice:{
        fontSize: 14,
        color: 'red',
    },
    inner1:{
        flex: Platform.OS == 'ios' ? 0.1:0.1,
        flexDirection: 'row',
        borderColor: '#dedbd3',
        borderTopWidth: 1,
    },
    bennerfirst: {
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image1: {
        flex: 0.15,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    benner2: {
        flex: 0.48,
        justifyContent: 'center',
        // backgroundColor:'red'
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
        top:4,
        //justifyContent: 'center',
        //alignItems: 'center',
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
    endMore:{
        // flex:1,
        flexDirection:'row',
        marginTop:10,
        justifyContent:'center',
    },
    noMoreImage:{
        width:200,
        height:200,
    },
  });
  