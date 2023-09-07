import React,{ useState, useEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert, Pressable } from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import ReactNativeBiometrics from 'react-native-biometrics'
import { useDispatch } from 'react-redux';
import { userLogOut } from '../redux/slices/userSlice'
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const StartScreen = ({navigation}) => {
    const dispatch = useDispatch()
    const rnBiometrics = new ReactNativeBiometrics()
    const [showCheckbox,setShowCheckbox]=useState(false)
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const isFocused = useIsFocused()
    
    useEffect(() => {
        navigation.addListener('beforeRemove', (e) => {
        e.preventDefault();
        Alert.alert(
            'Log out?',
            'Are you sure to Log out?, you will lose biometric autentication',
            [{ text: "Don't Log out", style: 'cancel', onPress: () => {} },
             { text: 'Log out',
               style: 'destructive',
               onPress: async() => {
                const { keysDeleted } = await rnBiometrics.deleteKeys()
                if(keysDeleted){
                    dispatch(userLogOut())
                    navigation.dispatch(e.data.action)
                }
               }
             }
            ]
        );
    })
    },[navigation]);


useEffect(() => {
    hasBioAuthSensor()
},[isFocused])

useEffect(() => {
    if(toggleCheckBox){
        navigation.navigate('BiometricEnrollment');
    }
},[toggleCheckBox,showCheckbox])
    
const hasBioAuthSensor = async () => {
    try{
        const {available} = await rnBiometrics.isSensorAvailable()
        const { keysExist } = await rnBiometrics.biometricKeysExist()
        console.log({available, keysExist})
        if(available && !keysExist){
            setShowCheckbox(true)
            setToggleCheckBox(false)
        }else if(available && keysExist){
            setShowCheckbox(false)
        }
    }catch(error){
        console.log(error)
    }
}
    
const checkBoxOnhange = async(newValue)=>{
    setToggleCheckBox(newValue)
}

const addAccount = ()=>{
    navigation.navigate('AccountCrud')
}

const removeAccounts = ()=>{
    console.log('remove')
}

const options = ()=>{
    console.log('options')
}


    return (
        <View style={style.backgroundView}>
            <View style={style.headerContainer}>
                <Text style={style.titleText}>Accounts</Text>
                <Pressable onPress={removeAccounts} style={style.addButton}>
                    <Icon name='remove' size={40} color="white"/>
                </Pressable>
                <Pressable onPress={addAccount} style={style.deleteButton}>
                    <Icon name='add' size={40} color="white"/>
                </Pressable>
                <Pressable onPress={options} style={style.optionsButton}>
                    <Icon name='more-vert' size={40} color="white"/>
                </Pressable>
            </View>
            {showCheckbox && 
                <TouchableOpacity style={style.bioAuthCheckbox} onPress={()=>checkBoxOnhange(!toggleCheckBox)}>
                    <CheckBox
                        disabled={false}
                        value={toggleCheckBox}
                        onValueChange={checkBoxOnhange}
                    />
                    <Text style={style.bioAuthCheckboxText}>Enable biometric authentication</Text>
                </TouchableOpacity>
            }
        </View>
    );
}

const style = StyleSheet.create({
    backgroundView:{
        flex:1,
        backgroundColor: '#4996FA',
      },
    titleText:{
    fontSize:30,
    fontWeight:'bold',
    color:'white',
    },
    bioAuthCheckboxText:{
        fontSize:10,
        fontWeight:'bold',
        color:'white', 
    },
    bioAuthCheckbox:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
    headerContainer:{
        flexDirection:'row',
        with:'100%',
        justifyContent:'space-around',
        paddingTop:'2%'

    }
})

export default StartScreen;