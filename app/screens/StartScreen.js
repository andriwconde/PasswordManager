import React,{ useState, useEffect } from 'react';
import {View, Text, StyleSheet, _View} from 'react-native'
import FingerprintScanner from 'react-native-fingerprint-scanner';
import BiometricPopUp from '../components/BiometricPopUp';
import CheckBox from '@react-native-community/checkbox';
import * as Keychain from 'react-native-keychain';

const StartScreen = ({navigation}) => {
    const [fingerprintPopUp,setFingerprintPopUp]=useState(false)
    const [fingerPrintButton,setFingerprintButton]=useState(false)
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    useEffect(() => {

        FingerprintScanner
          .isSensorAvailable()
          .then(biometryType => {
            biometryType && setFingerprintButton(true)
          })
          .catch(error => console.log(error)); 
      
      },[])
    
    const checkBoxOnhange = async(newValue)=>{
        setToggleCheckBox(newValue)
        if(newValue){
            const getCredentials = await Keychain.getGenericPassword();
            getCredentials.bioAuth = true
            console.log({getCredentials})
            dispatch(userLogin({getCredentials,navigation}))
        }
    }

    return (
        <View style={style.backgroundView}>
            <Text style={style.titleText}>Welcome</Text>
            {fingerPrintButton && 
                <View style={style.bioAuthCheckbox}>
                    <CheckBox
                        disabled={false}
                        value={toggleCheckBox}
                        onValueChange={checkBoxOnhange}
                    />
                    <Text style={style.bioAuthCheckboxText}>Enable biometric authentication</Text>
                </View>
            }
        </View>
    );
}

export default StartScreen;

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