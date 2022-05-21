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
} from 'react-native'
import Fontisto from 'react-native-vector-icons/Fontisto'
import moment from  'moment'
import I18n from "../Service/Translate";
import  Loading  from "../Components/Loading"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes'
import { color } from 'react-native-reanimated'
export default class Money extends Component{
   
    constructor(prop){
        super(prop)
        this.state={
            page:1,
            loading:true,
            end:false,
            listTotalSuccess:[],
            refreshing:false,
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        const {user} = this.props
        const {listTotalSuccess, page} = this.state
        if(nextProps.user.listTotalSuccessError && nextProps.user.listTotalSuccessError !== user.listTotalSuccessError){
            Alert.alert(I18n.t('alertWentWrong'))
        }
        if(nextProps.user.listTotalSuccess && nextProps.user.listTotalSuccess !== user.listTotalSuccess){
            if(nextProps.user.listTotalSuccess.length > 0){
                this.setState({
                    listTotalSuccess:[...listTotalSuccess, ...nextProps.user.listTotalSuccess],
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
            listTotalSuccess:[],
            refreshing:true,
            page: 1,
            end:false,
        })
        this.props.ListTotalSuccess(1)
    }
    componentDidMount(){
        this.handleListTotalSuccess()
    }
    handleListTotalSuccess(){
        const {page} = this.state
        this.props.listTotalSuccess(page)
    }
    renderListTotalSuccess(){
        const {listTotalSuccess} = this.state
        console.log("listTotalSuccess",listTotalSuccess)
    }
    renderListTotalSuccess(){
        const {listTotalSuccess} = this.state
        console.log("listTotalSuccess",listTotalSuccess)
        var results = []
        for(let index = 0; index < listTotalSuccess.length; index++){
            const element = listTotalSuccess[index];
            results.push(
                <TouchableOpacity style={styles.branch}
                    onPress={()=>{NavigationService.navigate(NAV_TYPES.MONEYDETAIL, {data:element})}}>  
                    {/* RESULTPACKAGE */}
                    <View style={styles.ListTitleBox}>
                        <Text style={styles.ListTitle}>{element.driverName}</Text>
                    </View>
                    <View style={styles.dateBox}>
                        <Text style={styles.Date}>{element.dateTime && moment(element.dateTime).format("DD-MMMM-YYYY")}</Text>
                    </View>
                </TouchableOpacity>
            )
        }
        console.log("results",results);
        return results
    }
    render(){
        const {user} = this.props
        const { loading, end, refreshing, listTotalSuccess} = this.state
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
                            <Text style={{fontSize:22, color:'#02475e',fontFamily:'Battambang-Bold'}}>{I18n.t('PaymentHistory')}</Text>
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
                                    (user.listTotalSuccess.length <= listTotalSuccess.length) && 
                                    !end
                                ){
                                    this.handleListTotalSuccess()
                                }
                            }}
                        >
                        <SafeAreaView style={styles.innerBox}>
                            {this.renderListTotalSuccess()}
                            {loading && 
                                <ActivityIndicator style={{marginTop:10}} size='small' color={'gray'} />   
                            }
                            {end && listTotalSuccess.length > 0 &&
                                <Text style={styles.end}>{I18n.t('noMore')}</Text>
                            }
                        </SafeAreaView>
                        {end && listTotalSuccess.length == 0 &&
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
        position:"relative"
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
        color:'black',
        fontSize:12,
        textAlign:'center',
        padding:10,
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
    branch:{
        // flex: 0.08,
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
        marginEnd:20,
        // backgroundColor:'yellow'
    },
    ListTitle:{
       color:"#02475e",
       fontSize:14,
       marginLeft:20,
       fontFamily:'Battambang-Bold',
    },
    back:{
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
        fontSize: 18,
        color:  '#02475e',
        fontFamily:'Battambang-Bold',
    },
    Date:{
        fontSize:12,
        color:'#02475e',
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
  