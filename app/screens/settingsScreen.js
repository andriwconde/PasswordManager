import React,{ useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, Alert } from 'react-native';
import IconButton from '../components/iconButton';
import ReactNativeBiometrics from 'react-native-biometrics'
import { useIsFocused } from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
import { useDispatch, useSelector } from 'react-redux';
import { userLogOut } from '../redux/slices/userSlice'




const SettingsScreen = ({route,navigation})  => {
  const dispatch = useDispatch()
  const [switchState, setSwitchState] = useState(false)
  const [bioSett, setBioSett] = useState(false)
  const rnBiometrics = new ReactNativeBiometrics()
  const isFocused = useIsFocused()

  const toggleSwitch = async()=>{
    const bioAuth = await EncryptedStorage.getItem('bioAuth')
    if(!switchState && !bioAuth){
      navigation.navigate('BiometricEnrollment')
      setSwitchState(!switchState)
    }else if(switchState && bioAuth){
      Alert.alert(
        'Desactivate Biometric Login',
        'Are you sure you want to desactivate biometric login? this will log you out',
        [{ text: "Don't Desactivate", style: 'cancel', onPress: () => {} },
         { text: 'OK',
           style: 'destructive',
           onPress: async() => {
            await EncryptedStorage.clear();
            await rnBiometrics.deleteKeys();
            dispatch(userLogOut())
            navigation.navigate('Login')
            setSwitchState(!switchState)
           }
         }
        ]
    );

    }
  }

  useEffect(()=>{
    hasBiometricSensor()
  },[isFocused])

  const hasBiometricSensor = async ()=>{
    const {available} = await rnBiometrics.isSensorAvailable()
    if(available){
      setBioSett(true)
      const { keysExist } = await rnBiometrics.biometricKeysExist()
      if(keysExist){
        setSwitchState(true)
      }
    }
  }

  const options = ()=>{
    navigation.openDrawer();
  }
  
  return (
    <View style={style.backgroundView}>
      <View style={style.headerContainer}>
          <Text style={style.titleText}>Settings</Text>
          <IconButton onPress={options} icon='more-vert' size={40} color="white"/>
      </View>
      {bioSett && <View style={style.biometricLoginView}>
        <Text style={style.biometricLoginText}>Biometric Login</Text>
        <Switch
        trackColor={{false: '#767577', true: '#8D95FF'}}
        thumbColor={switchState ? '#4B58FF' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={switchState}
      />
      </View>}
    </View>
  );
};

const style = StyleSheet.create({
  backgroundView:{
    flex:1,
  },
  backButton:{
    alignSelf:'flex-start',
    marginTop:'3%'
  },
  headerContainer:{
    flexDirection:'row',
    with:'100%',
    justifyContent:'space-between',
    paddingHorizontal:'3%',
    paddingVertical:'2%',
    borderWidth:1,
    backgroundColor: '#4996FA',
  },
  titleText:{
    fontSize:30,
    fontWeight:'bold',
    color:'white',
  },
  biometricLoginView:{
    flexDirection:'row',
    borderWidth:1,
    paddingVertical:7,
    paddingHorizontal:7,
    justifyContent:'space-between',
  },
  biometricLoginText:{
    fontSize:25,
    fontWeight:'bold',
    color:'#4996FA',
  }
})

export default SettingsScreen;