import React,{Component} from 'react'
import {
    Text,
    StyleSheet,
    Alert,
    View,
    TouchableOpacity,
    ScrollView,
    useWindowDimensions,
    contentWidth,
    Platform
} from 'react-native'
import HTML from "react-native-render-html";
import I18n from "../Service/Translate";
import {STATUS_TEXT} from "../Modules/app/config"
import  Loading  from "../Components/Loading";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes'
import moment from 'moment';



const htmlContent = `
    <h1>This HTML snippet is now rendered with native components !</h1>
    <h2>Enjoy a webview-free and blazing fast application</h2>
    <img src="https://i.imgur.com/dHLmxfO.jpg?2" />
    <em style="textAlign: center;">Look at how happy this native cat is</em>
`;

export default class SiteInformation extends Component{
    
    constructor(prop){
        super(prop)
        this.state = {
            htmlContent:false,
            siteInformation:false,
            // privacyPolicy:false,
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps){
        const {user} = this.props
        const {dataInput} = this.state
        if(nextProps.user.siteInformationError && nextProps.user.siteInformationError !== user.siteInformationError){
            console.log('siteInformation',siteInformation);
            Alert.alert(I18n.t('alertWentWrong'))
        }
        if(nextProps.user.siteInformation && nextProps.user.siteInformation !== user.siteInformation){
            
            console.log(nextProps.user.siteInformation);
            if( nextProps.user.siteInformation.length > 0){
                this.setState({siteInformation:nextProps.user.siteInformation[0]})
            }
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
        this.props.siteInformation()
    }

    render(){
        const {dataInput,siteInformation} = this.state
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
                                    style={{color:'#02475e',marginRight:'-12%',fontSize:33}} name="keyboard-arrow-left"> 
                                </MaterialIcons>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.benner}>
                            <Text style={styles.headerTitle} fontFamily={'Battambang-Bold'}>{I18n.t('PoliciesTerms')}</Text>
                        </View>    
                        <View style={styles.btnBack}>

                        </View>
                    </View>
                   
                    <ScrollView style={{ flex: 1 }}>
                        <View style={styles.content}>
                            <HTML source={{ html: siteInformation.privacyPolicy }}></HTML>
                        </View>
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
        position: 'relative',
    },
    inner:{
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white',
        marginTop:Platform.OS == 'ios' ? '10%':'5%',

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
     color: '#02475e',
     fontFamily:'Battambang-Bold',
    },
    content:{
        flex:1,
        flexDirection:'row',
        padding:Platform.OS == 'ios' ? 0:2,
        paddingRight:Platform.OS == 'ios' ? 20:20,
        //backgroundColor:'yellow',
        justifyContent:'center',
        //alignItems:'center'
        
    },
  });
  