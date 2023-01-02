import React,{useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Modal} from 'react-native'
import FingerprintScanner from 'react-native-fingerprint-scanner';
import BiometricPopUp from '../components/BiometricPopUp';
import { setLogin } from '../redux/slices/LoginSlice';

const HomeScreen = ({navigation})  => {
  
  const [modalState, setModalState] = useState(false)
  const [fingerprintPopUp,setFingerprintPopUp]=useState(false)
  const [fingerPrintButton,setFingerprintButton]=useState(false)
  const [formValues,setFormValues] = useState({
    email:'',
    password:''
  })

useEffect(() => {

  FingerprintScanner
    .isSensorAvailable()
    .then(biometryType => {
      biometryType && setFingerprintButton(true)
    })
    .catch(error => console.log(error)); 

},[])


const handleInput =(input,value)=>{
  setFormValues({...formValues,[input]:value})
}
const handleSubmit = async({email,password}) => {
  (email === "" || password === "") && setModalState(true)
  setLogin(formValues)
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
          <View style={style.buttonsView}>
            {fingerPrintButton && <BiometricPopUp fingerprintPopUp={fingerprintPopUp} setFingerprintPopUp={setFingerprintPopUp}/>}
            <TouchableOpacity 
              style={style.submitButton}
              onPress={()=>handleSubmit(formValues)}
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
  buttonsView:{
    alignItems: 'center',
    marginTop:10,
    flexDirection:'row'
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
  },
  fingerPrintButton:{
    backgroundColor:'white',
    width:'65%',
    paddingVertical:10,
    borderRadius:5,
    paddingHorizontal:5,
    marginRight:15,
    flexDirection:'row'
  },
  fingerPrintText:{
    alignSelf:'center',
    color:'#374FC6',
    fontSize:13
  },
  fingerprintButtonView:{
    alignItems: 'flex-end',
    marginTop:12,
    borderWidth:1
  },
  fingerSVG:{
    height:'42%',
    flex:1,
    marginLeft:2
  }
})

export default HomeScreen;
