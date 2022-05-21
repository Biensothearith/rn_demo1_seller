import React,{Component, version} from 'react'
import {
    Text,
    StyleSheet,
    Image,
    View,
    TouchableOpacity,
    Button,
    Modal,
    ToastAndroid
} from 'react-native'
import Fontisto from 'react-native-vector-icons/Fontisto'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import RadioForm, {
    RadioButton, 
    RadioButtonInput, 
    RadioButtonLabel
  } from 'react-native-simple-radio-button';
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes'
import { color } from 'react-native-reanimated'

var hobbies = [
    {label: "ភាសាខ្មែរ", value: "ភាសាខ្មែរ"},
    {label: "English", value: "English"},
    {label: "chinese", value:"chinese"},
  ];
export default class Language extends Component{
   
    constructor(){
        super()
        this.state={
        show:false
        } 
    }
    render(){
        return(
            <>
                <View style={styles.container}>
                    <Button title="ភាសា" onPress={()=>{this.setState({show:true})}}></Button>
                    <Modal transparent={true} visible={this.state.show}>
                        <View style={{backgroundColor:'#fffff',flex:1,justifyContent:'center'}}>
                            <View style={{backgroundColor:'#ffffff',margin:20,borderRadius:10,flex:0.3,shadowColor: "#000",shadowOffset: {
                                width: 0,
                                height: 6,
                            },
                            shadowOpacity: 0.37,
                            shadowRadius: 7.49,

                            elevation: 12,}}>
                                <View style={styles.popUpTitle}>
                                    <Text style={styles.popUpTitle} style={{fontSize:16,fontFamily:'Battambang-Bold',color:'white'}}>ភាសា</Text>
                                </View>
                                <View style={styles.listRadio}>
                                    <RadioForm
                                            radio_props={hobbies}
                                            // initial={4}
                                             onPress={(value) => {ToastAndroid.show(value.toString(), ToastAndroid.SHORT)}}
                                            buttonSize={13}
                                            buttonOuterSize={20}
                                            selectedButtonColor={'#02475e'}
                                            selectedLabelColor={'#02475e'}
                                            labelStyle={{ fontSize: 20, }}
                                            disabled={false}
                                            formHorizontal={false}
                                            style={{ flex:1,height:100 }}
                                            itemShowKey="label"
                                            itemRealKey="value"
                                            circleSize={16}
                                            initial={1}
                                            // formHorizontal={false}
                                            // labelHorizontal={false}
                                            
                                        />
                                </View>
                                <TouchableOpacity style={styles.footerBtn} 
                                    onPress={()=>{this.setState({show:false})}}>
                                    <Text style={{fontSize:16,fontFamily:'Battambang-Bold',color:'white'}}>រួចរាល់</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            </>
        )
    }
}
const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'white',
    },
    popupTitle:{
        flex:0.25,
        flexDirection:'row',
        backgroundColor:'#02475e',
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        borderTopEndRadius:10,
        borderTopStartRadius:10,
    },
    listRadio:{
        backgroundColor:'#ffffffaa',
        flex:0.5,
        flexDirection:'row',
        color:'white',
        fontSize:18,textAlign:'center',
        justifyContent:'center',
        alignItems:'center',
        paddingLeft:'5%',
        paddingTop:25,
    },
    footerBtn:{
        flex:0.25,
        flexDirection:'row',
        backgroundColor:'#fb3640',
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
        borderBottomEndRadius:10,
        borderBottomStartRadius:10,
    },
  });
  