import React,{useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Modal, NativeModules} from 'react-native'

import { increase, decrease } from '../redux/slices/loginSlice';
import ButtonOne from '../components/ButtonOne';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import PropTypes from 'prop-types';
import FingerprintScanner from 'react-native-fingerprint-scanner';


const HomeScreen = ({navigation})  => {


const [emailInput,setEmailInput] = useState('')
const [passwordInput,setPasswordInput] = useState('')
const [modalState, setModalState] = useState(false)

useEffect(() => {

  FingerprintScanner
    .isSensorAvailable()
    .then(biometryType => console.log({ biometryType }))
    .catch(error => console.log(error)); 

},[])


const handleInput =(input,value)=>{
input === 'email' && setEmailInput(value) 
input === 'password' && setPasswordInput(value)
}
const handleSubmit = async() => {
  (emailInput === "" || passwordInput === "") ? setModalState(true):
  FingerprintScanner
    .isSensorAvailable()
    .then(biometryType => console.log({ biometryType }))
    .catch(error => console.log(error)); 
}


  return (
    <View style={style.backgroundView}>
      <View style={style.loginForm}>
        <View style={style.loginTitle}>
          <Text style={[style.titleText, style.textColorStyle]}>Login</Text>
        </View>
        <View style={style.inputsView}>
          <View style={style.inputView}>
            <Text style={[style.textColorStyle, style.inputTitleTextStyle]}>E-mail:</Text>
            <TextInput 
              style={style.inputStyles} 
              placeholder='example@mail.com'
              onChangeText={(value)=>handleInput('email',value)}
              autoComplete='email'
            />
          </View>
          <View style={style.inputView}>
            <Text style={[style.textColorStyle, style.inputTitleTextStyle]}>Password:</Text>
            <TextInput 
            style={style.inputStyles} 
            placeholder='one-secure-password'
            secureTextEntry={true}
            onChangeText={(value)=>handleInput('password',value)}
            />
          </View>
          <View style={style.submitButtonView}>
            <TouchableOpacity 
            style={style.submitButton}
            onPress={()=>handleSubmit()}
            >
              <Text style={[style.textColorStyle,style.submitButtonText]}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <Modal 
        animationType="fade"
        transparent={true}
        visible={modalState}
      >
        <View style={style.modalStyle}>
          <View style={style.modalCartel}>
            <Text style={[style.modalTextMessage]}>You have to fill all the fields</Text>
            <TouchableOpacity 
            style={style.okButton}
            onPress={()=>setModalState(false)}
            >
              <Text style={[style.okButtonText, style.textColorStyle]}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const style = StyleSheet.create({
  backgroundView:{
    flex:1,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor: '#374FC6',

  },
  loginForm:{
    height:'40%',
    width:'90%',
    borderRadius:10
  },
  loginTitle:{
    borderTopRightRadius:10,
    borderTopLeftRadius:10,
    alignItems:'center',
    paddingBottom:3
  },
  titleText:{
    fontSize:30,
    },
  textColorStyle:{
    fontWeight:'bold',
    color:'white',
  },
  inputTitleTextStyle:{
    fontSize:20
  },
  inputView:{
    marginBottom:7
  },
  inputStyles:{
    borderWidth:2,
    backgroundColor:'white',
    borderRadius:5,
    borderColor:'white',
    fontWeight:'bold',
    color:'black',
    fontSize:20,
    paddingVertical:6,
  },
  inputsView:{
    paddingHorizontal:4,
    paddingTop:4,
    borderTopWidth:1,
    borderTopColor:'white'
  },
  submitButton:{
    backgroundColor:'white',
    width:'30%',
    paddingVertical:8,
    borderRadius:5,
  },
  submitButtonText:{
    alignSelf:'center',
    color:'#374FC6',
    fontSize:20
  },
  submitButtonView:{
    alignItems: 'flex-end',
    marginTop:12
  },
  modalStyle:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'rgba(0, 0, 0, 0.5)'
  },
  modalCartel:{
    backgroundColor:'white',
    borderWidth:1,
    width:'90%',
    borderRadius:25,
    justifyContent:'center',
    paddingHorizontal:7,
    paddingVertical:30
  },
  modalTextMessage:{
    color:'#374FC6',
    fontSize:27,
    alignSelf:'center',
    fontWeight:'bold',
    marginBottom:30
  },
  okButton:{
    backgroundColor:'#374FC6',
    width:'30%',
    paddingVertical:8,
    borderRadius:5,
    alignSelf:'center'
  },
  okButtonText:{
    alignSelf:'center',
    color:'white',
    fontSize:20
  }
})

export default HomeScreen;
