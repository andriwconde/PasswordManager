import React,{ useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, ScrollView, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ReactNativeBiometrics from 'react-native-biometrics'
import { addAccount, accountStateClear } from '../redux/slices/accountSlice';
import { Divider } from '../components/Divider';

const AccountCrud = ({navigation})  => {
  const dispatch = useDispatch()
  const account = useSelector(state => state.account.account)
  const loading = useSelector(state => state.user.loading)
  const [visibility, setVisibility]= useState(false)
  const [modalState, setModalState] = useState(false)
  const [formValues,setFormValues] = useState({
    accountTitle:null,
    username: null,
    password: null,
  })

  useEffect(()=>{
    if(account === true){
      dispatch(accountStateClear())
      navigation.navigate('Start')
    }
  },[account])

  const handleVisibility=()=>{
    setVisibility(!visibility)
  }

  const handleInput =(input,value)=>{
    setFormValues({...formValues,[input]:value})
  }
  const handleSubmit = async () => {
    const {username, password, accountTitle} = formValues
  if(username === null || password === null || accountTitle === null) {
    setModalState(true);
  } else{
    dispatch(addAccount(formValues));
  }
  }


  return (
    <ScrollView contentContainerStyle={style.backgroundView}>
      <View style={style.loginForm}>
        <View style={style.inputsView}>
          <View style={style.inputView}>
            <Text style={style.inputTitleTextStyle}>Account:</Text>
            <TextInput 
              style={style.inputStyles} 
              placeholder='Business instagram'
              onChangeText={(value)=>handleInput('accountTitle',value)}
              placeholderTextColor='#ACACAC'
            />
          </View>
          <View style={style.inputView}>
            <Text style={style.inputTitleTextStyle}>Username:</Text>
            <TextInput 
              style={style.inputStyles} 
              placeholder='example@mail.com'
              onChangeText={(value)=>handleInput('username',value)}
              autoComplete='username'
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
            onPress={handleSubmit}
            >
            <Text style={style.submitButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
      {loading === 'LOADING' && <View style={style.loadingContainer}>
        <ActivityIndicator size="large" color="#374FC6" />
      </View>}
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
    </ScrollView>
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
    height:'60%',
    width:'90%',
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
  loadingContainer: {
    width: '100%',
    height: '100%',
    position:'absolute',
    justifyContent: 'center',
    backgroundColor:'#7F7F7F',
    opacity:0.7
  }
})

export default AccountCrud;
