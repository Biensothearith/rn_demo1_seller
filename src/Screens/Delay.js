import React,{Component} from 'react'
import {
    Text,
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    Alert,SafeAreaView, Platform
} from 'react-native'
import moment from 'moment'
import  Loading  from "../Components/Loading";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import I18n from "../Service/Translate";
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes'
export default class Delay extends Component{
   
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
            console.log("nextProps.user.report",nextProps.user.report);
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
            date: moment('2021-05-21').format("YYYY-MM-DD"),
            type: 'delay',
        })
    }
    renderList(){
        const {report} = this.state
        var result=[]
        for (let index = 0; index < report.length; index++) {
            const element = report[index];
            var imageStatus = []
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
            // if(result.length > 0){
                result.push(
                    <TouchableOpacity style={styles.branch}
                        onPress={()=>{NavigationService.navigate(NAV_TYPES.SPECAILINFODELIVERY,{data:element})}}>
                        <View style={styles.image}>
                            <Image
                                style={styles.SuccessImage}
                                source={require('../Assets/images/delay-Clock.jpg')}
                            />
                        </View>
                        <View style={styles.ListTitleBox}>
                            <Text style={styles.ListTitle}>{element.sellerAddress} - {element.receiverAddress}</Text>
                        </View>
                        <View style={styles.dateBox}>
                        <Text style={styles.Date}>{element.dateTime && moment('2021-05-21').format("DD-MMMM-YYYY")}</Text>
                        </View>
                    </TouchableOpacity>
                )
            // }
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
                            <Text style={{fontSize:22, color:'#02475e',
                                fontFamily:'Battambang-Bold',paddingTop:10}}>
                                    {I18n.t('delayed')}
                            </Text>
                            <Text style={{fontSize:14, color:'#02475e',
                                fontFamily:'Battambang-Bold',}}>
                                {moment().format("DD-MMMM-YYYY")}
                            </Text> 
                        </View>    
                        <View style={styles.btnBack}>

                        </View>
                    </View>

                    <View flex={0}
                        style={{
                            borderBottomColor: '#02475e',
                            borderBottomWidth: 1, Top:50,
                        }}
                    />
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
                </View>
                </SafeAreaView>
            </>
        )
    }
}
const styles = StyleSheet.create({
    container:{
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
    branch:{
        flex:Platform.OS == 'ios' ? 0.1:0.1,
        flexDirection:'row',
        borderBottomColor:'#02475e',
        borderBottomWidth:1,
    },
    image: {
        flex: 0.15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    SuccessImage: {
        width: 35,
        height: 35,
    },
    ListTitleBox:{
        flex:0.55,
        flexDirection:'row',
        alignItems:'center',
        // backgroundColor:'red'
    },
    dateBox:{
        flex:0.3,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'flex-end',
        paddingEnd:10,
        // backgroundColor:'yellow'
    },
    ListTitle:{
       color:"#02475e",
       fontSize:14,
       fontFamily:'Battambang-Bold',
    },
    Date:{
        color:"#02475e",
        fontSize:12,
        fontFamily:'Battambang-Bold',
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
  















// import React,{Component} from 'react'
// import {
//     Text,
//     StyleSheet,
//     Image,
//     View,
//     TouchableOpacity,
// } from 'react-native'
// import Fontisto from 'react-native-vector-icons/Fontisto'
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
// import AntDesign from 'react-native-vector-icons/AntDesign'
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'



// import NavigationService from '../Service/navigationService'
// import { NAV_TYPES } from '../Navigation/navTypes'
// import { color } from 'react-native-reanimated'
// export default class Delay extends Component{
   
//     constructor(prop){
//         super(prop)
//         this.state={
        
//         } 
//     }
//     render(){
//         return(
//             <>
//                 <View style={styles.container}>
//                     <View style={styles.headerTitle}>
//                         <Text style={{fontSize:22, color:'white',fontFamily:'KhmerOScontent',paddingTop:10}}>ឥវ៉ាន់ពន្យាពេលទទួល</Text>
//                         <Text style={{fontSize:14, color:'white',fontFamily:'KhmerOScontent',}}>០៨​ , ឧសភា , ២០២១</Text>
//                     </View>
                    
//                     <View flex={0.03}
//                         style={{
//                             borderBottomColor: 'white',
//                             borderBottomWidth: 1, Top:50,
//                         }}
//                     />
//                     <TouchableOpacity style={styles.branch}
//                         onPress={()=>{NavigationService.navigate(NAV_TYPES.SPECAILINFODELIVERY)}}>
//                         <View style={styles.image}>
//                             <Image
//                                 style={styles.SuccessImage}
//                                 source={require('../Assets/images/timer.png')}
//                             />
//                         </View>
//                         <View style={styles.ListTitleBox}>
//                             <Text style={styles.ListTitle}>មាសសុធា</Text>
//                         </View>
//                         <View style={styles.dateBox}>
//                         <Text style={styles.Date}>០៨​ , ឧសភា , ២០២១</Text>
//                         </View>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.branch}
//                         onPress={()=>{NavigationService.navigate(NAV_TYPES.SPECAILINFODELIVERY)}}>
//                         <View style={styles.image}>
//                             <Image
//                                 style={styles.SuccessImage}
//                                 source={require('../Assets/images/timer.png')}
//                             />
//                         </View>
//                         <View style={styles.ListTitleBox}>
//                             <Text style={styles.ListTitle}>ពេជ្រ សូវណ្ណច័ន្ទឧត្តម</Text>
//                         </View>
//                         <View style={styles.dateBox}>
//                             <Text style={styles.Date}>០៩​ , ឧសភា , ២០២១</Text>
//                         </View>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.branch}
//                         onPress={()=>{NavigationService.navigate(NAV_TYPES.SPECAILINFODELIVERY)}}>
//                         <View style={styles.image}>
//                             <Image
//                                 style={styles.SuccessImage}
//                                 source={require('../Assets/images/timer.png')}
//                             />
//                         </View>
//                         <View style={styles.ListTitleBox}>
//                             <Text style={styles.ListTitle}>វណ្ណ ក្លូរ</Text>
//                         </View>
//                         <View style={styles.dateBox}>
//                             <Text style={styles.Date}>១០ , ឧសភា , ២០២១</Text>
//                         </View>
//                     </TouchableOpacity>
//                     <TouchableOpacity style={styles.branch}
//                         onPress={()=>{NavigationService.navigate(NAV_TYPES.SPECAILINFODELIVERY)}}>
//                         <View style={styles.image}>
//                             <Image
//                                 style={styles.SuccessImage}
//                                 source={require('../Assets/images/timer.png')}
//                             />
//                         </View>
//                         <View style={styles.ListTitleBox}>
//                             <Text style={styles.ListTitle}>វណ្ណ កច់</Text>
//                         </View>
//                         <View style={styles.dateBox}>
//                             <Text style={styles.Date}>១១ , ឧសភា , ២០២១</Text>
//                         </View>
//                     </TouchableOpacity>
//                 </View>
//             </>
//         )
//     }
// }
// const styles = StyleSheet.create({
//     container:{
//         flex: 1,
//         backgroundColor: '#02475e',
//         position:'relative'
//     },
//     headerTitle:{
//         flex: 0.1,
//         justifyContent:'center',
//         alignItems:'center',
//     },
//     branch:{
//         flex: 0.08,
//         flexDirection:'row',
//         borderBottomColor:'white',
//         borderBottomWidth:1,
//     },
//     image: {
//         flex: 0.15,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     SuccessImage: {
//         width: 30,
//         height: 30,
//     },
//     ListTitleBox:{
//         flex:0.45,
//         flexDirection:'row',
//         alignItems:'center',
//         // backgroundColor:'red'
//     },
//     dateBox:{
//         flex:0.4,
//         flexDirection:'row',
//         alignItems:'center',
//         justifyContent:'flex-end',
//         paddingEnd:10,
//         // backgroundColor:'yellow'
//     },
//     ListTitle:{
//        color:"white",
//        fontSize:14,
//        fontFamily:'KhmerOScontent',
//     },
//     Date:{
//         color:"#aad8d3",
//         fontSize:12,
//         fontFamily:'KhmerOScontent',
//      },
//   });
  