import React,{Component} from 'react'

import {
    Text,
    Alert,
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    Dimensions,
    PixelRatio
} from 'react-native'
import  Loading  from "../Components/Loading";
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes'
import Geolocation from 'react-native-geolocation-service';
import {PERMISSIONS} from 'react-native-permissions';
import requestPermission from './../Utils/requestPermission'
import MapView, {PROVIDER_GOOGLE, Circle, Marker} from 'react-native-maps';

const EdgePadding = {
    top: 50,
    right: 10,
    bottom: 50,
    left: 10
}
const EdgePaddingAndroid = {
    top: 50,
    right: 10,
    bottom: 50,
    left: 10
}

const generateEdgePadding = (edgePadding) => {
 return {
        top: PixelRatio.getPixelSizeForLayoutSize(edgePadding.top),
        right: PixelRatio.getPixelSizeForLayoutSize(edgePadding.right),
        left: PixelRatio.getPixelSizeForLayoutSize(edgePadding.left),
        bottom: PixelRatio.getPixelSizeForLayoutSize(edgePadding.bottom)
 };
}
const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const formHeight = 200
const LATITUDE_DELTA = 0.00120;
const LONGITUDE_DELTA = (ASPECT_RATIO * LATITUDE_DELTA);
export default class MotoMap extends Component{
    constructor(prop){
        super(prop)
        this.state = {
            dataInput:{
                amount:'2',
                requestType:'2', 
                location:{ 
                    latitude:'',
                    longitude:'',
                }
            },
            mapReady:false
        }
    }
    

    UNSAFE_componentWillReceiveProps(nextProps){
        const {user} = this.props
        const {dataInput} = this.state
      
        if(nextProps.user.sendRequireBookingError && nextProps.user.sendRequireBookingError !== user.sendRequireBookingError){
            if(nextProps.user.sendRequireBookingError.data && nextProps.user.sendRequireBookingError.data.message && nextProps.user.sendRequireBookingError.data.message == "all_drivers_busy"){
                alert(I18n.t('alertDriverBusy'))
            }else{
                // alert('something went wrong')
                alert(I18n.t('alertWentWrong'))
            }
        }
        if(nextProps.user.sendRequireBooking && nextProps.user.sendRequireBooking !== user.sendRequireBooking){
            NavigationService.navigate(NAV_TYPES.MESSAGE)
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

    handleSendRequireBooking(){
        const {dataInput} = this.state
        var amount = dataInput.amount
        this.props.sendRequireBooking({
            ...dataInput,
            amount: amount,
        })
       
    }
    async componentDidMount(){
        
    }
    handleChangeLocation(e){
        if(e && e.nativeEvent && e.nativeEvent.coordinate && e.nativeEvent.coordinate.latitude){
            console.log('e.nativeEvent.coordinate.latitude', e.nativeEvent.coordinate.latitude)
        }
    }
    handleGetID(){
        const {dataShop} = this.state
        console.log('dataShop', dataShop);
        this.props.requestBookingDone({id: dataShop.id})
    }
    gotToMyLocation(){
        const {dataInput} = this.state
        this.setState({
            mapReady:true
        })
        var this_ = this;
        const REQUESTED = Platform.OS === "ios" ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION
        requestPermission(REQUESTED, function (results) {
            if(results){
                Geolocation.getCurrentPosition(
                    (position) => {
                        if (this_.mapRef) {
                            this_.mapRef.animateToRegion({
                                latitude: position.coords.latitude,
                                longitude: position.coords.longitude,
                                latitudeDelta: LATITUDE_DELTA,
                                longitudeDelta: LONGITUDE_DELTA
                            })
                        }
                        this_.setState({
                            dataInput:{
                                ...dataInput,
                                location:{
                                    latitude: position.coords.latitude,
                                    longitude: position.coords.longitude
                                }
                            }
                        })
                    },
                    (error) => {
                        console.log(error.code, error.message, error);
                    },
                    { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
                );
            }
        })
    }
    handleRegionChangeComplete(value){
        const {dataInput} = this.state
        this.setState({
            dataInput:{
                ...dataInput,
                location:{
                    latitude: parseFloat(value.latitude),
                    longitude: parseFloat(value.longitude)
                }
            }
        })
    }
    render(){
        const {dataInput, mapReady} = this.state
        const {user} = this.props
        return(
            <>
                {user.pending &&
                    <Loading/>
                }
                    <KeyboardAvoidingView 
                        behavior={Platform.OS === "ios" ? "padding" : 'height'} 
                        style={styles.container}
                        keyboardVerticalOffset={Platform.OS === "ios" ? 0 :25}
                    >
                        <MapView style={styles.map}
                            initialRegion={{
                                latitude: 11.5251726,
                                longitude: 104.8200649,
                                latitudeDelta: 5,
                                longitudeDelta: 5,
                            }}
                            showsUserLocation={true}
                            ref={(ref) => { this.mapRef = ref }}
                            onUserLocationChange={(e) => this.handleChangeLocation(e)}
                            onMapReady={() => this.gotToMyLocation()}
                            provider={MapView.PROVIDER_GOOGLE}
                            onRegionChange={(value) => this.handleRegionChangeComplete(value)}
                        >
                            {dataInput && dataInput.location && dataInput.location.latitude && dataInput.location.latitude != '' && mapReady ?
                                <Marker.Animated
                                    coordinate={{
                                        latitude: parseFloat(dataInput.location.latitude),
                                        longitude: parseFloat(dataInput.location.longitude),
                                    }}
                                >
                                </Marker.Animated>
                                :null
                            }
                        </MapView>
                        <View
                            style={styles.formContent}
                        >
                        {/* <View style={styles.inputProTitle}> */}
                            <View style={styles.titleeBox}>
                                <Text style={styles.proTitle}>សូមបញ្ចូលចំនួនអីវ៉ាន់របស់អ្នក</Text>
                            </View>
                            <View style={styles.NumberPackage}>
                                <View style={styles.title}>
                                    <Text style={{color:'white',fontSize:14,fontFamily:'Battambang-Bold',}}>
                                        ចំនួនអីវ៉ាន់ៈ
                                    </Text>
                                </View>
                                <View style={styles.number} >
                                    <TextInput style={styles.inputBox} 
                                        placeholder="បញ្ចូលចំនួន"
                                        placeholderTextColor="#aad8d3"
                                        keyboardType="numeric"
                                        fontSize={14}
                                        borderColor= 'white'
                                        borderBottomWidth= {1}
                                        value={dataInput.amount}
                                        onChangeText={(value) => this.handleChangeInput('amount', value)}
                                    />
                                    <View style={styles.Package} >
                                        <Text style={{color:'white',fontSize:14,fontFamily:'Battambang-Bold',}}>កេះ</Text>
                                    </View>
                                </View>
                            </View>
                            
                            <TouchableOpacity style={styles.footer}
                                onPress={() => this.handleSendRequireBooking()}
                                >
                            <Text style={styles.ready} >ហៅឥឡូវ</Text>
                            </TouchableOpacity>
                        </View>
                    </KeyboardAvoidingView>
                
            </>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    keyAvoid:{
        //backgroundColor:'red',
        height:'100%'
    },  
    map:{
        width:'100%',
        height: height - formHeight,
        flex:1
    },
    formContent:{
        width:'100%',
        height: formHeight,
        backgroundColor:'#02475e',
        alignItems:'center',
        flexDirection:'column'
    },  
    inner:{
        flex: 0.1,
        flexDirection: 'row',
        backgroundColor: 'green',
    },
    benner: {
        flex: 0.30,
    },
    benner1: {
        flex: 0.1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: 20,
        height: 20,
    },
    mapBox:{
        flex: 0.65,
        flexDirection: 'row',
        position: 'relative',
        
    },
    Location:{
        flex: 0.1,
        flexDirection: 'row',
        position: 'absolute',
        marginLeft:"30%",
        justifyContent:'center',
        alignItems:'center',
        top:30,
    },
    titleeBox:{
        flex:.4,
        justifyContent:'center'
    },
    proTitle:{
        
        fontSize: 18,
        color:'white',
        fontFamily:'Battambang-Bold',
        textAlign: 'center',
        marginTop:'3%',
        width:'100%'
    },
    NumberPackage:{
        flex:.4,
        flexDirection:"row",
        paddingLeft:30,
        paddingRight:30,
        justifyContent:'center'
    },
    inputBox:{
        flex:0.7,
        height:50,
        fontFamily:'Battambang-Bold', 
        color:'#fff'
    },
    Package:{
        flex:0.3,
        height:50,
        fontFamily:'Battambang-Bold', 
        textAlign:'center',
        borderBottomColor:'white',
        borderBottomWidth:1,
        justifyContent:'center',
        alignItems:'flex-end',
    },
    title:{
        justifyContent:'center',
        alignItems:'center',
        marginRight:10,
        marginBottom:25
    },
    number:{
        flex:1,
        flexDirection:'row',
    },
    footer:{
         flex:0.2,
        width:'100%',
        paddingVertical: 8,
        flexDirection: 'row',
        backgroundColor: '#fb3640',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf:'flex-end',
        
    },
    ready:{
        fontSize: 18,
        color:  'white',
        fontFamily:'Battambang-Bold',
    },  
  });
  