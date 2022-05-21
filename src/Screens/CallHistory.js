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
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes'
export default class CallHistory extends Component{
   
    constructor(prop){
        super(prop)
        this.state={
            page:1,
            loading:true,
            end:false,
            dataCalledDriver:[],
            refreshing:false,
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        const {user} = this.props
        const {dataCalledDriver, page} = this.state
        if(nextProps.user.dataCalledDriverError && nextProps.user.dataCalledDriverError !== user.dataCalledDriverError){
            Alert.alert(I18n.t('alertWentWrong'))
        }
        if(nextProps.user.dataCalledDriver && nextProps.user.dataCalledDriver !== user.dataCalledDriver){
            if(nextProps.user.dataCalledDriver.length > 0){
                this.setState({
                    dataCalledDriver:[...dataCalledDriver, ...nextProps.user.dataCalledDriver],
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
    }
    async handleRefresh(){
        const {page} = this.state
        await this.setState({
            dataCalledDriver:[],
            refreshing:true,
            page: 1,
            end:false,
        })
        this.props.listCalledDriver(1)
    }
    componentDidMount(){
        this.handleListCalledDriver()
    }
    handleListCalledDriver(){
        const {page} = this.state
        this.props.listCalledDriver(page)
    }
    renderListCalledDriver(){
        const {dataCalledDriver} = this.state
        console.log("dataCalledDriver",dataCalledDriver)
    }
    renderListCalledDriver(){
        const {dataCalledDriver} = this.state
        console.log("dataCalled driver",dataCalledDriver)
        var results = []
        for(let index = 0; index < dataCalledDriver.length; index++){
            const element = dataCalledDriver[index];
            results.push(
                <TouchableOpacity style={styles.branch}
                    onPress={()=>{NavigationService.navigate(NAV_TYPES.DETAIL_CALLED_DRIVER, {data:element})}}>  
                    {/* RESULTPACKAGE */}
                    <View style={styles.ListTitleBox}>
                        <Text style={styles.ListTitle}>{element.driverName}</Text>
                    </View>
                    <View style={styles.dateBox}>
                        <Text style={styles.Date}>{element.dateTime && moment(element.dateTime).format("DD-MMMM-YYYY")}</Text>
                    </View>
                </TouchableOpacity>
                // <View style={styles.branch}>
                //     <TouchableOpacity 
                //         style={{flex:.8,flexDirection:'row'}}
                //         onPress={()=>{NavigationService.navigate(NAV_TYPES.DETAIL_CALLED_DRIVER, {data:element})}}>  
                //         {/* RESULTPACKAGE */}
                //         <View style={styles.ListTitleBox}>
                //             <Text style={styles.ListTitle}>{element.driverName}</Text>
                //         </View>
                //         <View style={styles.dateBox}>
                //             <Text style={styles.Date}>{element.dateTime && moment(element.dateTime).format("DD-MMMM-YYYY")}</Text>
                //         </View>
                //     </TouchableOpacity>
                //     <TouchableOpacity 
                //         style={{flex:.2}}
                //     >
                //         <View style={styles.dateBox}>
                //             <Text style={styles.Date}>cancel</Text>
                //         </View>
                //     </TouchableOpacity>
                // </View>                      
            )
        }
        console.log("results",results);
        return results
    }
    render(){
        const {user} = this.props
        const { loading, end, refreshing, dataCalledDriver} = this.state
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
                                    style={{color:'#02475e',marginRight:'20%',fontSize:33}} name="keyboard-arrow-left"> 
                                </MaterialIcons>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.benner}>
                            <Text style={{fontSize:22, color:'#02475e',fontFamily:'Battambang-Bold'}}>
                                {I18n.t('callHistory')}
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
                                    (user.dataCalledDriver.length <= dataCalledDriver.length) && 
                                    !end
                                ){
                                    this.handleListCalledDriver()
                                }
                            }}
                        >
                        <SafeAreaView style={styles.innerBox}>
                            {this.renderListCalledDriver()}
                            {loading && 
                                <ActivityIndicator style={{marginTop:10}} size='small' color={'gray'} />   
                            }
                            {end &&
                                 <Text style={styles.end}>{I18n.t('noMore')}</Text>
                            }
                        </SafeAreaView>
                            {end && dataCalledDriver.length == 0 &&
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
        flex:0.5,
        flexDirection:'row',
        alignItems:'center',
        // backgroundColor:'red'
    },
    dateBox:{
        flex:0.5,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
        marginRight:20,
        // backgroundColor:'yellow'
    },
    ListTitle:{
       color:"#02475e",
       fontSize:14,
       marginLeft:20,
       fontFamily:'Battambang-Bold',
    },
    Date:{
        color:"#02475e",
        fontSize:12,
        marginLeft:20,
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
  