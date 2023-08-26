import React,{ useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics'
import { userLogin } from '../redux/slices/userSlice';

const BiometricEnrollmentScreen = ({navigation})  => {
  const dispatch = useDispatch()
  const rnBiometrics = new ReactNativeBiometrics();
  const loggedUser = useSelector(state => state.user.loggedUser)
  const [visibility, setVisibility]= useState(false)
  const [modalState, setModalState] = useState(false)
  const [formValues,setFormValues] = useState({
    email: null,
    password: null,
    publicKey: null
  })

  useEffect(() => {
    if(loggedUser?.user.publickey){
      navigation.navigate('Start')
    }
  },[loggedUser])

  useEffect(() => {
    //deleteKeys()
  },[])

const deleteKeys = async() =>{
  try{
    const { keysDeleted } = await rnBiometrics.deleteKeys()
    console.log({keysDeleted})
  }catch(err){
    console.log(err)
  }
}

const handleVisibility=()=>{
  setVisibility(!visibility)
}

const handleInput =(input,value)=>{
  setFormValues({...formValues,[input]:value})
}

const handleSubmit = async() => {
    try{
      const { success } = await rnBiometrics.simplePrompt({promptMessage: 'Confirm fingerprint'})
      if(success){
        const { publicKey }  = await rnBiometrics.createKeys()
        const valuesWithKey ={...formValues,publicKey}
        dispatch(userLogin(valuesWithKey))
        console.log({valuesWithKey})
      }
    }catch(err){
      console.log({err})
    }
}


  return (
    <View style={style.backgroundView}>
      <View style={style.loginForm}>
      <View style={style.loginTitle}>
          <Text style={style.titleText}>Biometric Enrollment</Text>
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
            <View >
              <TextInput 
              style={style.inputStyles}
              placeholder='one-secure-password'
              placeholderTextColor='#ACACAC'
              secureTextEntry={!visibility}
              onChangeText={(value)=>handleInput('password',value)}
              />
              {!visibility ? <TouchableOpacity
              onPress={()=>handleVisibility()}
              style={style.visibilityIcon}
              >
                <Icon name='visibility' size={35} color="#ACACAC" />
              </TouchableOpacity>:
              <TouchableOpacity
              onPress={()=>handleVisibility()}
              style={style.visibilityIcon}
              >
                <Icon name='visibility-off' size={35} color="#ACACAC" />
              </TouchableOpacity>
              }
            </View>

          </View>
          <TouchableOpacity 
            style={style.submitButton}
            onPress={async()=>handleSubmit(formValues)}
            >
            <Text style={style.submitButtonText}>Submit</Text>
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
  visibilityIcon:{
    alignSelf:'flex-end',
    position:'absolute',
    marginTop:4,
    paddingRight:10
  },

})

export default BiometricEnrollmentScreen;
