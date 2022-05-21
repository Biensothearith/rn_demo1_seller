import React,{Component} from 'react'
import {
    Text,
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    KeyboardAvoidingView,
    ScrollView,
    TextInput,
    Dimensions,
    Alert,
} from 'react-native'
import  Loading  from "../Components/Loading";
const { width, height } = Dimensions.get("window");
const formHeight = 73
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes'
export default class ChangeNShop extends Component{
   
      
    constructor(prop){
        super(prop)
        this.state = {
            dataInput:{
                name:'',
            }
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        const {user} = this.props
        const {dataInput} = this.state
      
        if(nextProps.user.updateInformationError && nextProps.user.updateInformationError !== user.updateInformationError){
            if(nextProps.user.updateInformationError.data && nextProps.user.updateInformationError.data.message && nextProps.user.updateInformationError.data.message == "all_drivers_busy"){
                 Alert.alert('Please try again later...!')
            }else{
                 Alert.alert('something went wrong')
            }
        }
        // if(nextProps.user.updateInformation && nextProps.user.updateInformation !== user.updateInformation){
        //     NavigationService.navigate(NAV_TYPES.MSTSHOP)
        // }
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
    handleUpdateInformation(){
        const {dataInput} = this.state
        var name = dataInput.name
        this.props.updateInformation({
            ...dataInput,
            name: name
        })
       
    }
    render(){
        const {dataInput} = this.state
        const {user} = this.props
        return(
            <>
            {user.pending &&
                    <Loading/>
                }
              <ScrollView style={styles.container}>
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : 'null'} style={styles.keyAvoid}>
                        <View style={styles.upBox}>
                        
                            <View style={styles.HeaderImage}>
                                <Image style={{width:120,height:120}}
                                    source={require('../Assets/images/shop.png')}
                                />
                            </View>
                            
                            <Text style={styles.HeaderTitle}>
                                ប្ដូរឈ្មោះគណនីថ្មី
                            </Text> 
                            <TextInput style={styles.inputBox}
                                placeholder="បញ្ចូលឈ្មោះគណនីថ្មី"
                                placeholderTextColor="#cae4db"
                                keyboardType="text"
                                color='white'
                                fontSize={12}
                                value={dataInput.name}
                                onChangeText={(value) => this.handleChangeInput('name', value)}
                            />
                            <TextInput style={styles.inputBox}
                                placeholder="បញ្ចូលលេខសម្ងាត់"
                                placeholderTextColor="#cae4db"
                                keyboardType="text"
                                color='white'
                                fontSize={12}
                            />
                        </View> 
                        <View style={styles.formContent}>
                            <TouchableOpacity style={styles.footer}
                                onPress={() => NavigationService.navigate(NAV_TYPES.CREDITDETAIL)} >
                                <Text style={styles.ready}>រួចរាល់</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </KeyboardAvoidingView>    
                </ScrollView>
            </>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#02475e',
    },
    keyAvoid:{
        //backgroundColor:'red',
        height:'100%'
    },  
    upBox:{
        width:'100%',
        height: height - formHeight,
    },
    formContent:{
        width:'100%',
        height: formHeight-24,
        backgroundColor:'#02475e',
        position:'relative'
    }, 
    HeaderImage:{
        flex: 0.3,
        flexDirection: 'row',
        justifyContent:'center',
        alignItems: 'center',
        top:20,
        // backgroundColor:'red'
    },
    HeaderTitle:{
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        fontFamily:'Battambang-Bold',
        margin:'10%',
        marginBottom:'10%',

    },
    inputBox:{
        flex:0.06,
        flexDirection:"row",
        borderBottomColor: '#ffffff',
        borderBottomWidth: 1,
        fontFamily:'Battambang-Bold', 
        marginLeft:"10%",
        marginRight:"10%"
    },
    footer:{
        // flex:0.3,
        // flexDirection:'row',
        width:'100%',
        paddingVertical: 10,
        flexDirection: 'row',
        backgroundColor: '#fb3640',
        justifyContent: 'center',
        alignItems: 'center',
        // borderTopColor:'white',
        // borderTopWidth:3, 
        position:'absolute',
        // marginTop:'11%',
        bottom:"0%",
        alignSelf:'flex-end'
        
    },
    ready:{
        fontSize: 18,
        color:  'white',
        fontFamily:'Battambang-Bold',
    },
    
    
  });
  