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
} from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'

const { width, height } = Dimensions.get("window");
const formHeight = 73
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes'
export default class ChangeBank extends Component{
   
    constructor(prop){
        super(prop)
        this.state={
        
        } 
    }
    render(){
        return(
            <>
                <ScrollView style={styles.container}>
                    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : 'null'} style={styles.keyAvoid}>
                        <View style={styles.upBox}>
                            <View style={styles.HeaderImage}>
                                <Image style={{width:120,height:120}}
                                    source={require('../Assets/images/credit-card.png')}
                                />
                            </View>
                            
                            <Text style={styles.HeaderTitle}>
                                ប្ដូរឈ្មោះស្ថាប័ន
                            </Text> 
                            <TextInput style={styles.inputBox}
                                placeholder="បញ្ចូលឈ្មោះស្ថាប័នថ្មី"
                                placeholderTextColor="#cae4db"
                                keyboardType="text"
                                color='white'
                                fontSize={12}
                                
                            />
                            <TextInput style={styles.inputBox}
                                placeholder="បញ្ចូលពាក្យសម្ងាត់"
                                placeholderTextColor="#cae4db"
                                keyboardType="text"
                                color='white'
                                fontSize={12}
                                
                            />
                            <TextInput style={styles.inputBox}
                                placeholder="បញ្ចាក់ពាក្យសម្ងាត់"
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
  