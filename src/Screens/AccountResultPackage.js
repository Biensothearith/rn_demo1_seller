

import React,{Component} from 'react'
import {Text,StyleSheet,Image,View,TouchableOpacity} from 'react-native'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import NavigationService from '../Service/navigationService'
import { NAV_TYPES } from '../Navigation/navTypes'
import { color } from 'react-native-reanimated'
export default class AccountResultPackage extends Component{
    constructor(prop){
        super(prop)
        this.state={
           
        } 
    }
    render(){
        return(
            <>
                <View style={styles.container}>
                    <View style={styles.inner}>
                        <View style={styles.btnBack}>
                            <TouchableOpacity onPress={()=>{NavigationService.navigate(NAV_TYPES.CALLHISTORY)}}>
                                <MaterialIcons
                                    style={{color:'#005792',marginRight:'0%',fontSize:40}} name="keyboard-arrow-left" size={15} color={'#ffffff'}> 
                                </MaterialIcons>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.benner}>
                        <Text style={styles.text}> សរុបចំនួន ០៧​ កញ្ចប់</Text>
                            <Text style={styles.textSmall} style={{fontFamily:'Battambang-Bold',color:'#005792',}}> ០៧​,​ ឧសភា,​ ២០២១ </Text>  
                        </View>    
                        <View style={styles.btnBack}>

                        </View>
                    </View>
                        {/* dollar report of package */}
                    <TouchableOpacity style={styles.inner1}
                            onPress={()=>{NavigationService.navigate(NAV_TYPES.SPECAILINFODELIVERY)}}
                            >
                        <View style={styles.bennerfirst}>
                            <Image
                                style={styles.SuccessImage}
                                source={require('../Assets/images/Income.jpg')}
                            />
                        </View>
                        <View style={styles.benner2}>
                            <Text style={styles.text1}>ទួលគោក - ទួលសង្កែ</Text>
                        </View>  
                        <View style={styles.benner2Price}>
                            <Text style={styles.textPrice}>10$</Text>
                        </View>  
                        <View style={styles.benner2Price}>
                            <Text style={styles.textPrice}>4000៛</Text>
                        </View>       
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inner1}
                                onPress={()=>{NavigationService.navigate(NAV_TYPES.SPECAILINFODELIVERY)}}
                                >
                        <View style={styles.image}>
                            <Image
                                style={styles.SuccessImage}
                                source={require('../Assets/images/Income.jpg')}
                            />
                        </View>
                        <View style={styles.benner3}>
                            <Text style={styles.text1}>ទួលគោក - ជ្រោយចង្វា</Text>
                        </View>
                        <View style={styles.bennerPrice}>
                            <Text style={styles.textPrice}>10$</Text>
                        </View>  
                        <View style={styles.bennerPrice}>
                            <Text style={styles.textPrice}>4000៛</Text>
                        </View>           
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inner1}
                                onPress={()=>{NavigationService.navigate(NAV_TYPES.SPECAILINFODELIVERY)}}
                                >
                        <View style={styles.image}>
                            <Image
                                style={styles.SuccessImage}
                                source={require('../Assets/images/Income.jpg')}
                            />
                        </View>
                        <View style={styles.benner3}>
                            <Text style={styles.text1}>ទួលគោក - ទឹកថ្លា</Text>
                        </View>
                        <View style={styles.bennerPrice}>
                            <Text style={styles.textPrice}>10$</Text>
                        </View>  
                        <View style={styles.bennerPrice}>
                            <Text style={styles.textPrice}>4000៛</Text>
                        </View>           
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inner1}
                                onPress={()=>{NavigationService.navigate(NAV_TYPES.SPECAILINFODELIVERY)}}
                                >
                        <View style={styles.image}>
                            <Image
                                style={styles.SuccessImage}
                                source={require('../Assets/images/Income.jpg')}
                            />
                        </View>
                        <View style={styles.benner3}>
                            <Text style={styles.text1}>ទួលគោក - ឈូកមាស</Text>
                        </View>
                        <View style={styles.bennerPrice}>
                            <Text style={styles.textPrice}>10$</Text>
                        </View>  
                        <View style={styles.bennerPrice}>
                            <Text style={styles.textPrice}>4000៛</Text>
                        </View>           
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inner1}
                                onPress={()=>{NavigationService.navigate(NAV_TYPES.SPECAILINFODELIVERY)}}
                                >
                        <View style={styles.image}>
                            <Image
                                style={styles.SuccessImage}
                                source={require('../Assets/images/Income.jpg')}
                            />
                        </View>
                        <View style={styles.benner3}>
                            <Text style={styles.text1}>ទួលគោក - ព្រែកព្នៅ</Text>
                        </View>
                        <View style={styles.bennerPrice}>
                            <Text style={styles.textPrice}>10$</Text>
                        </View>  
                        <View style={styles.bennerPrice}>
                            <Text style={styles.textPrice}>4000៛</Text>
                        </View>           
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inner1}
                                onPress={()=>{NavigationService.navigate(NAV_TYPES.SPECAILINFODELIVERY)}}
                                >
                        <View style={styles.image}>
                            <Image
                                style={styles.SuccessImage}
                                source={require('../Assets/images/Income.jpg')}
                            />
                        </View>
                        <View style={styles.benner3}>
                            <Text style={styles.text1}>ទួលគោក - វេងស្រេង</Text>
                        </View>
                        <View style={styles.bennerPrice}>
                            <Text style={styles.textPrice}>10$</Text>
                        </View>  
                        <View style={styles.bennerPrice}>
                            <Text style={styles.textPrice}>4000៛</Text>
                        </View>           
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.inner1}
                        onPress={()=>{NavigationService.navigate(NAV_TYPES.SPECAILINFODELIVERY)}}>
                        <View style={styles.bennerfirst}>
                            <Image
                                style={styles.notSuccessImage}
                                source={require('../Assets/images/unSuccess.jpg')}
                            />
                        </View>
                        <View style={styles.benner2}>
                            <Text style={styles.text1}>ទួលគោក - ទួលសង្កែ</Text>
                        </View>  
                        <View style={styles.benner2Price}>
                            <Text style={styles.textPrice}>10$</Text>
                        </View>  
                        <View style={styles.benner2Price}>
                            <Text style={styles.textPrice}>4000៛</Text>
                        </View>       
                    </TouchableOpacity>
                    {/* result */}
                    <View style={styles.inner1}>
                        <View style={styles.image}>
                            
                        </View>
                        <View style={styles.bennerTotal}>
                            <Text style={styles.totalPrice}>បរាជ័យ</Text>
                            <Text style={styles.price} style={{marginLeft: 8,fontSize: 14,color: 'red',}}>10$</Text>
                        </View>
                        <View style={styles.bennerTotalPrice}>
                            <Text style={styles.totalPrice}>តម្លៃសរុប</Text>
                            <Text style={styles.price}>60$</Text>
                        </View>  
                        <View style={styles.bennerTotalPrice}>
                            <Text style={styles.totalPrice}>តម្លៃសេវា</Text>
                            <Text style={styles.price}>28000៛</Text>
                        </View>           
                    </View>
                </View>
            </>
        )
    }
}
const styles = StyleSheet.create({
    container: {
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
        // backgroundColor:'yellow'
    },
    text:   {
     fontSize: 22,
     color: '#005792',
     fontFamily:'Battambang-Bold',
    },
    textPrice:{
        fontSize: 14,
        color: 'red',},
    inner1:{
        flex: 0.06,
        flexDirection: 'row',
        borderColor: '#dedbd3',
        borderTopWidth: 1,
    },
    bennerfirst: {
        flex: 0.16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image1: {
        flex: 0.16,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        flex: 0.16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    benner2: {
        flex: 0.44,
        justifyContent: 'center',
    },
    benner2Price: {
        flex: 0.20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    benner3: {
        flex: 0.44,
        justifyContent: 'center',
    },
    bennerTotal: {
        flex: 0.44,
        justifyContent: 'center',
    },
    bennerPrice: {
        flex: 0.20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    bennerTotalPrice: {
        flex: 0.20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    text:{
        fontSize: 20,
        color: '#005792',
        fontFamily:'Battambang-Bold',
    },
    text1:{
        fontSize: 14,
        color: '#005792',
        fontFamily:'Battambang-Bold',
    },
    totalPrice:{
        marginTop:10,
        fontSize: 14,
        color: '#005792',
        fontFamily:'Battambang-Bold',
    },
    price:{
        fontSize: 14,
        color: 'red',
    },
    centerLogo: {
        flex: 1,
        width: 100,
        height: 100,
    },
    SuccessImage: {
        width: 30,
        height: 30,
    },
    notSuccessImage: {
        width: 25,
        height: 25,
        marginLeft: 15,
    },
  });
  