import React,{useState, useEffect} from 'react';
import {View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Modal} from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import BiometricPopUp from '../components/BiometricPopUp';
import {appVersion} from '../redux/slices/userSlice'
import {Divider} from '../components/Divider';

const HomeScreen = ({navigation})  => {
  const dispatch = useDispatch()
  const version = useSelector(state => state)
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

useEffect(() => {
  console.log(version)
},[version])


const handleInput =(input,value)=>{
  setFormValues({...formValues,[input]:value})
}
const handleSubmit = async({email,password}) => {
  (email === "" || password === "") ? setModalState(true):
dispatch(appVersion())
}


  return (
    <View style={style.backgroundView}>
      <View style={style.loginForm}>
      {fingerPrintButton && 
              <BiometricPopUp fingerprintPopUp={fingerprintPopUp} setFingerprintPopUp={setFingerprintPopUp}/>
            }
        <View style={style.loginTitle}>
          <Text style={style.titleText}>Login</Text>
        </View>
        <View style={style.inputsView}>
          <View style={style.inputView}>
            <Text style={style.inputTitleTextStyle}>E-mail:</Text>
            <TextInput 
              style={style.inputStyles} 
              placeholder='example@mail.com'
              onChangeText={(value)=>handleInput('email',value)}
              autoComplete='email'
              placeholderTextColor='#ACACAC'
            />
          </View>
          <View style={style.inputView}>
            <Text style={style.inputTitleTextStyle}>Password:</Text>
            <TextInput 
            style={style.inputStyles} 
            placeholder='one-secure-password'
            placeholderTextColor='#ACACAC'
            secureTextEntry={true}
            onChangeText={(value)=>handleInput('password',value)}
            />
          </View>
          <TouchableOpacity 
            style={style.submitButton}
            onPress={()=>handleSubmit(formValues)}
            >
            <Text style={style.submitButtonText}>Submit</Text>
          </TouchableOpacity>
          <Divider/>
          <TouchableOpacity 
            style={style.toRegisterLink}
            onPress={()=>navigation.navigate('Register')}
            >
            <Text style={style.toRegisterLinkText}>Create an account</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal 
        animationType="fade"
        transparent={true}
        visible={modalState}
      >
        <View style={style.modalStyle}>
          <View style={style.modalCartel}>
            <Text style={style.modalTextMessage}>You have to fill all the fields</Text>
            <TouchableOpacity 
            style={style.okButton}
            onPress={()=>setModalState(false)}
            >
              <Text style={style.okButtonText}>OK</Text>
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
    backgroundColor: '#4996FA',

  },
  loginForm:{
    height:'70%',
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
    fontWeight:'bold',
    color:'white',
    },
  inputTitleTextStyle:{
    fontSize:20,
    fontWeight:'bold',
    color:'white',
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
    borderTopColor:'white',
  },
  submitButton:{
    backgroundColor:'white',
    borderRadius:5,
    justifyContent:'center',
    paddingVertical:4,
    marginVertical:34
  },
  submitButtonText:{
    alignSelf:'center',
    color:'#374FC6',
    fontSize:23,
    fontWeight:'bold',
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
    fontSize:20,
    fontWeight:'bold',
    color:'white',
  },
  toRegisterLink:{
    backgroundColor:'white',
    borderRadius:5,
    justifyContent:'center',
    paddingVertical:4,
    marginTop:10
  },
  toRegisterLinkText:{
    alignSelf:'center',
    color:'#374FC6',
    fontSize:23,
    fontWeight:'bold',
  }
})

export default HomeScreen;
