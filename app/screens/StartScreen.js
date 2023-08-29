import React,{ useState, useEffect } from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native'
import CheckBox from '@react-native-community/checkbox';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import EncryptedStorage from 'react-native-encrypted-storage';

const StartScreen = ({navigation}) => {
    const [showCheckbox,setShowCheckbox]=useState(false)
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

useEffect(() => {
    hasBioAuthSensor()
    hasUserId()
    //deleteKeys()
},[])

useEffect(() => {
    if(toggleCheckBox){
        navigation.navigate('BiometricEnrollment');
    }
},[toggleCheckBox,showCheckbox])

const deleteKeys = async() =>{
    try{
      const { keysDeleted } = await rnBiometrics.deleteKeys()
      console.log({keysDeleted})
    }catch(err){
      console.log(err)
    }
  }

  const hasUserId = async()=>{
    try{
        const userId = await EncryptedStorage.getItem('userId')
        console.log({userId})
    }catch(err){
        console.log(err)
    }
    
  }

const hasBioAuthSensor = async () => {
    const rnBiometrics = new ReactNativeBiometrics()
    try{
        const {available, biometryType} = await rnBiometrics.isSensorAvailable()
        const { keysExist } = await rnBiometrics.biometricKeysExist()
        console.log({available, keysExist})
        if(available && !keysExist){
            setShowCheckbox(true)
        }else{
            setShowCheckbox(false)
        }
    }catch(error){
        console.log(error)
    }
}
    
const checkBoxOnhange = async(newValue)=>{
    setToggleCheckBox(newValue)
}

    return (
        <View style={style.backgroundView}>
            <Text style={style.titleText}>Welcome</Text>
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
        alignItems:'center',
        justifyContent:'center',
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
    }
})

export default StartScreen;