import StepIndicator from 'react-native-step-indicator';
import I18n from "../Service/Translate";
import React,{Component} from 'react'
import {STATUS_TEXT} from "../Modules/app/config"
import { Text,StyleSheet,Image,View,TouchableOpacity,Alert, Platform} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import  Loading  from "../Components/Loading";
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes'
import { color } from 'react-native-reanimated'
const widthColorLine = {
    blue:[0.3, 0.6, 1],
    gray:[0.7, 0.4, 0]
}
export default class Home extends Component{
    constructor(prop){
        super(prop)
        this.state = {
            dataInput:false,
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        const {user} = this.props
        const {dataInput} = this.state
        if(nextProps.user.reportError && nextProps.user.reportError !== user.reportError){
            Alert.alert(I18n.t('alertWentWrong'))
        }
        // if(nextProps.user.report && nextProps.user.report !== user.report){
        //     NavigationService.navigate(NAV_TYPES.MAIN_HOME01,{data: dataInput})
        // }
    }
    componentDidMount(){
        const { navigation } = this.props;
        var data = navigation.getParam('data', false);
        console.log("data status",data);
        this.setState({
            dataInput:data,
        })
    }

    handleReport(){
        const {dataInput} = this.state
        var id = dataInput.id
        this.props.report({
             ...dataInput,
             id: id
         })
    }
    blueLineWidth(status){
        var results = null
        console.log('status',status);
        if(status == 0){
            results = {flex:0.3}
        }else if(status == 1){
            results = {flex: 0.6}
        }
        else if(status == 2){
            results = {flex: 1}
        }

        console.log('results',results);
        return results
    }

    render(){
        const {dataInput} = this.state
        const {user} = this.props
        console.log(dataInput.status,  widthColorLine.blue[dataInput.status]);
        return(
            <>
             {user.pending &&
                    <Loading/>
                }
                <View style={styles.container}>
                    <View style={styles.inner}>
                        <View style={styles.btnBack}>
                            <TouchableOpacity onPress={()=>{NavigationService.navigate(NAV_TYPES.SPECAILINFO)}}>
                                <MaterialIcons
                                    style={{color:'#005792',marginRight:'-12%',fontSize:33}} name="keyboard-arrow-left" size={15} color={'#ffffff'}> 
                                </MaterialIcons>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.benner}>
                        <Text style={styles.adsTitle}>{I18n.t('DeliveryInformation')}</Text>
                        </View>    
                        <View style={styles.btnBack}>

                        </View>
                    </View>
                    
                    { dataInput.status <= 2 ?
                        <>
                            <View style={styles.status}>
                                <View style={styles.bennerStatus} >
                                    <Text style={styles.adsTitleSub} >{dataInput && STATUS_TEXT[dataInput.status].description}</Text>
                                </View>
                            </View>
                            <View style={styles.lineStatus}>
                                <View style={styles.lineContainer}>
                                    <View style={[styles.lineBlue, dataInput && {flex:  widthColorLine.blue[dataInput.status]}]}>

                                    </View>
                                    <View style={[styles.lineGrey, dataInput && {flex:  widthColorLine.gray[dataInput.status]}]}>

                                    </View>
                                </View>
                                <View style={styles.statusCircle}>

                                    </View>
                                    <View style={[styles.statusCircle_01, parseInt(dataInput.status) >= 0 && {backgroundColor:'blue'}]}>

                                    </View>
                                    <View style={[styles.statusCircle_02, parseInt(dataInput.status) >= 1 && {backgroundColor:'orange'}]}>

                                    </View>
                                    <View style={[styles.statusCircle_03, parseInt(dataInput.status) >= 2 && {backgroundColor:'green'}]}>

                                </View>
                            </View>
                        </>
                        :
                        <View style={styles.status}>
                            <View style={styles.bennerStatus} >
                                <Text style={[styles.adsTitleSub,dataInput && {color:STATUS_TEXT[dataInput.status].color}] } >{dataInput && STATUS_TEXT[dataInput.status].description}</Text>
                            </View>
                        </View>
                    }
                    <View
                        style={{
                            borderBottomColor: 'skyblue',
                            borderBottomWidth: 1, margin:10,
                        }}
                    />
                    {/* <View style={styles.description}> */}
                        <Text style={styles.noteTitle} >{I18n.t('ShippingInformation')}{'\n'}<FontAwesome  name="circle" size={7} color={'#005792'}> </FontAwesome><Text style={styles.Title} >
                            {I18n.t('Description1')}</Text>
                        </Text>
                        <Text style={styles.noteTitle} >{I18n.t('ShippingInformation')}{'\n'}<FontAwesome name="circle" size={7} color={'#005792'}> </FontAwesome>
                        <Text style={styles.Title} >{I18n.t('Description2')}</Text>
                        </Text>
                    
                    <View style={styles.danger}>
                        <View style={styles.circle}>
                        
                        </View>
                        <View style={styles.circle}>
                        
                        </View>
                        <View style={styles.circle}>
                        
                        </View>
                        <View style={styles.circle}>
                        
                        </View>
                    </View>
                    <TouchableOpacity style={styles.footer}
                        // onPress={() => this.handleReport()}
                        onPress={()=>{NavigationService.navigate(NAV_TYPES.MAIN_HOME01)}}
                        
                        >
                        <Text style={styles.callDeliver} >{I18n.t('buttonDone')}</Text>
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
    inner:{
        flex: 0.15,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginTop:Platform.OS == 'ios' ? '8%':'2%'
    },
    btnBack:{
        flex: 0.15,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        // backgroundColor: 'red',
    },
    benner: {
        flex: 0.7,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        // backgroundColor:'yellow'
    },
    status:{
        flex: 0.4,
        flexDirection: 'row',
        marginBottom: 30,
    },
    bennerStatus: {
        flex: 1,
        margin:10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor:'#005792',
        justifyContent:'center',
        alignItems:'center',
        marginTop:0,
        // backgroundColor:'yellow',
        // borderRadius:5,
    },
    
    adsTitle:{
        fontSize: 20,
        color:'red',
        fontFamily:'Battambang-Bold',
    },
    adsTitleSub:{
        fontSize: 18,
        color:'black',
        fontFamily:'Battambang-Bold',
        padding: 20,
        textAlign:'center',
    },
    lineStatus:{
        flex:0.1,
        flexDirection:'column',
        // backgroundColor:'red',
        justifyContent:'center',
        position:'relative',
        marginLeft:10,
        marginRight:10,
    },
    lineContainer:{
        flexDirection:'row',
    },
    lineBlue:{
        height:3,
        backgroundColor:'blue'
    },
    lineGrey:{
        height:3,
        backgroundColor:'grey'
    },
    statusCircle:{
        height: 30,
        width: 30,
        borderRadius: 50,
        borderWidth:1,
        borderColor:'red',
        backgroundColor:'red',
        position:'absolute',
    },
    statusCircle_01:{
        height: 30,
        width: 30,
        borderRadius: 50,
        borderWidth:2,
        borderColor:'grey',
        left: "30%",
        backgroundColor:'white',
        position:'absolute'
    },
    statusCircle_02:{
        height: 30,
        width: 30,
        borderRadius: 50,
        borderWidth:2,
        borderColor:'grey',
        left: "60%",
        backgroundColor:'white',
        position:'absolute'
    },
    statusCircle_03:{
        height: 30,
        width: 30,
        borderRadius: 50,
        borderWidth:2,
        borderColor:'grey',
        right: "0%",
        backgroundColor:'white',
        position:'absolute'
    },
    order:{
        flex: 0.2,
        flexDirection: 'row',
        backgroundColor: 'black',
    },
    description:{
        flex:0.23,
        flexDirection:'row',
        borderTopColor: 'black',
        borderTopWidth: 1,
        margin: 10,
        marginBottom:0,
        paddingTop: 10,
        backgroundColor:'yellow',
    },
    description1:{
        flex:0.16,
        flexDirection:'row',
        margin: 10,
        marginTop: 0,
        marginBottom:0,
        // backgroundColor:'yellow',
    },
    noteTitle:{
        color: 'red',
        fontSize:10,
        lineHeight: 20,
        marginLeft:10,
        marginRight:10,
        fontFamily:'Battambang-Bold',
    },  
    Title:{
        color: '#005792',
        fontSize:10,
        lineHeight: 18,
    },  
    danger:{
        flex:0.1,
        flexDirection:'row',
        // backgroundColor:'#fb3640',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'3%'
    },
    circle: {
        height: 40,
        width: 40,
        borderRadius: 50,
        borderWidth:1,
        borderColor:'#005792',
        margin: 10,
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
    callDeliver:{
        fontSize: 18,
        color: 'white',
        fontFamily:'Battambang-Bold',
    },
  });
  