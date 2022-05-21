import React,{Component} from 'react'
import {
    Text,
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    ScrollView,
    RefreshControl,
    SafeAreaView,
    ActivityIndicator,
    Alert,
    Platform
} from 'react-native'
import I18n from "../Service/Translate";
import moment from  'moment'
import  Loading  from "../Components/Loading";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Feather from 'react-native-vector-icons/Feather'
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes'
export default class RequestBooking extends Component{
   
    constructor(prop){
        super(prop)
        this.state={
            page:1,
            loading:true,
            end:false,
            dataRequestBooking:[],
            refreshing:false,
            data:{
                bookID:""
            }
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        const {user} = this.props
        const {dataRequestBooking, page} = this.state
        // console.log('...nextProps.user.dataRequestBooking',nextProps.user.dataRequestBooking);
        if(nextProps.user.dataRequestBookingError && nextProps.user.dataRequestBookingError !== user.dataRequestBookingError){
            Alert.alert(I18n.t('alertWentWrong'))
        }
        if(nextProps.user.dataRequestBooking && nextProps.user.dataRequestBooking !== user.dataRequestBooking){
            if(nextProps.user.dataRequestBooking.length > 0){
                this.setState({
                    dataRequestBooking:[...dataRequestBooking, ...nextProps.user.dataRequestBooking],
                    loading:false,
                    page: page+1,
                    refreshing:false,
                })
            }else{
                this.setState({
                    end:true,
                    loading:false,
                    refreshing:false,
                })
            }
        }
        // if(nextProps.user.dataCancelBooking && nextProps.user.dataCancelBooking !== user.dataCancelBooking){
        //     alert('deleted')
        // }
    }
    async handleRefresh(){
        const {page} = this.state
        await this.setState({
            dataRequestBooking:[],
            refreshing:true,
            page: 1,
            end:false,
        })
        this.props.listRequestBooking(1)
    }
    componentDidMount(){
        this.handleListRequestBooking()
    }
    handleListRequestBooking(){
        const {page} = this.state
        this.props.listRequestBooking(page)
    }
    handleCancelBooking(bookID){
        this.state.data.bookID = bookID
        this.props.cancelBooking(this.state.data)
        this.handleRefresh()
    }
    // renderListRequestBooking(){
    //     const {dataRequestBooking} = this.state
    //     console.log("dataRequestBooking",dataRequestBooking)
    // }
    renderListRequestBooking(){
        const {dataRequestBooking} = this.state
        // console.log("dataCalled driver",dataRequestBooking)
        var results = []
        for(let index = 0; index < dataRequestBooking.length; index++){
            const element = dataRequestBooking[index];
            results.push(
                <View style={styles.branch}>
                    <TouchableOpacity 
                        style={{flex:.7,flexDirection:'row',justifyContent:'center'}}
                        // onPress={()=>{NavigationService.navigate(NAV_TYPES.DETAIL_CALLED_DRIVER, {data:element})}}
                    >  
                        {/* RESULTPACKAGE */}
                        <View style={styles.ListTitleBox}>
                            <Feather
                                style={styles.icon}
                                style={{fontSize:35}} name="package"> 
                            </Feather>
                            <Text style={styles.ListTitle}>{element.amount}</Text>
                        </View>
                        <View style={styles.dateBox}>
                            <Text style={styles.Date}>{element.dateTime && moment(element.dateTime).format("DD-MMMM-YYYY-h:mma")}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{flex:.3,backgroundColor:'#02475e',alignItems:'center',justifyContent:'center'}}
                        onPress={()=> this.handleCancelBooking(element.id)}
                    >
                        {/* <View style={styles.dateBox}> */}
                            <Text style={styles.cancel}>{I18n.t('Cancel')}</Text>
                        {/* </View> */}
                    </TouchableOpacity>
                </View>                      
            )
        }
        // console.log("results",results);
        return results
    }
    render(){
        const {user} = this.props
        const { loading, end, refreshing, dataRequestBooking} = this.state
        return(
            <>
            {user.pending &&
                    <Loading/>
                }
                <View style={styles.container}>
                    <View style={styles.inner}>
                        <View style={styles.btnBack}>
                            <TouchableOpacity 
                                onPress={()=>{NavigationService.navigate(NAV_TYPES.MSTSHOP)}}
                            >
                                <MaterialIcons
                                    style={{color:'#02475e',marginRight:'20%',fontSize:33}} name="keyboard-arrow-left"> 
                                </MaterialIcons>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.benner}>
                            <Text style={{fontSize:22, color:'#02475e',fontFamily:'Battambang-Bold'}}>
                                {I18n.t('waitingBooking')}
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
                    <ScrollView 
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={() => this.handleRefresh()}
                            />
                            }
                            onMomentumScrollEnd={(e)=>{
                                const scrollPosition = e.nativeEvent.contentOffset.y
                                const scrollViewHeigth = e.nativeEvent.layoutMeasurement.height
                                const contentHeigth = e.nativeEvent.contentSize.height
                                const isScrollToBottom = scrollPosition+scrollViewHeigth
                                if(
                                    isScrollToBottom >= (contentHeigth-150) && 
                                    (user.dataRequestBooking.length <= dataRequestBooking.length) && 
                                    !end
                                ){
                                    this.handleListRequestBooking()
                                }
                            }}
                        >
                        <SafeAreaView style={styles.innerBox}>
                            {this.renderListRequestBooking()}
                            {loading && 
                                <ActivityIndicator style={{marginTop:10}} size='small' color={'gray'} />   
                            }
                            {end &&
                                 <Text style={styles.end}>{I18n.t('noMore')}</Text>
                            }
                        </SafeAreaView>
                            {end && dataRequestBooking.length == 0 &&
                                <>
                                <View style={styles.endMore}>
                                    <Image
                                    style={styles.noMoreImage}
                                    source={require('../Assets/images/EmptyIcon.png')}
                                />
                                </View>
                                <Text  style={{fontSize:22,
                                    fontFamily:'Battambang-Bold',
                                    color:'black',
                                    padding:0,
                                    textAlign:'center',
                                    top:-25,}}>
                                    {I18n.t('noData')}
                                </Text>
                                <Text 
                                    style={{fontSize:16,
                                        fontFamily:'Battambang-Bold',
                                        color:'black',
                                        padding:0,
                                        textAlign:'center',
                                        top:-20,
                                    }}
                                >
                                    {I18n.t('YouHaveNoData')}
                                </Text>
                            </> 
                            }
                    </ScrollView> 
                </View>
            </>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
        position:'relative',
    },
    inner:{
        height:60,
        flexDirection: 'row',
        justifyContent: 'center',
        //backgroundColor: 'yellow',
        marginTop:Platform.OS == 'ios' ? '10%':'5%',
    },
    innerBox:{
        flex:1,
        // backgroundColor:'yellow',
    },
    end:{
        color:'#c7c7c7',
        fontSize:12,
        textAlign:'center',
        padding:10,
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
    branch:{
        paddingVertical:15,
        flexDirection:'row',
        borderBottomColor:'#02475e',
        borderBottomWidth:1,
    },
    ListTitleBox:{
        flex:0.3,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
        // backgroundColor:'red'
    },
    icon:{
        flex:0.8,
        flexDirection:'row',
        alignItems:'center',
        backgroundColor:'red'

    },
    dateBox:{
        flex:0.7,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
        // marginRight:20,
        // backgroundColor:'black'
    },
    ListTitle:{
       color:"#02475e",
       fontSize:14,
    //    marginLeft:20,
       fontFamily:'Battambang-Bold',
    },
    Date:{
        color:"#02475e",
        fontSize:12,
        // marginLeft:20,
        fontFamily:'Battambang-Bold',
    },
    cancel:{
        color:"#fff",
        fontSize:12,
        // marginLeft:20,
        fontFamily:'Battambang-Bold',
    },
    endMore:{
        flex:1,
        flexDirection:'row',
        marginTop:10,
        marginBottom:5,
        // backgroundColor:'red',
        justifyContent:'center',
        alignItems:'center'
    },
    noMoreImage:{
        width:200,
        height:200,
    },
  });
  