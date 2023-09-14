import React,{ useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { addAccount, accountStateClear, updateAccount, deleteAccount } from '../redux/slices/accountSlice';
import IconButton from '../components/iconButton';
import { getAccounts } from '../redux/slices/accountSlice'
import { userLogOut } from '../redux/slices/userSlice'



const AccountCrudScreen = ({route,navigation})  => {
  const dispatch = useDispatch()
  const item = route.params
  const account = useSelector(state => state.account.account)
  const loading = useSelector(state => state.user.loading)
  const [visibility, setVisibility]= useState(false)
  const [modalState, setModalState] = useState(false)
  const [editableInputs, setEditableInputs] = useState(item ? false : true)
  const [formValues,setFormValues] = useState({
    accountTitle: item ? item.accountTitle : null,
    username: item ? item.username : null,
    password: item ? item.password : null,
  })

  useEffect(()=>{
    if(account?.status === true){
      dispatch(accountStateClear())
      dispatch(getAccounts())
      Alert.alert(`Account ${account.action}`,account.msg)
      navigation.navigate('Start')
    }else if (account?.code === 403){
      Alert.alert(
        'Expired Sesion',
        'Your session is expired',
        [{ text: 'OK', onPress: () => {
          dispatch(accountStateClear());
          dispatch(userLogOut());
          navigation.navigate('Login')
          }
        }]
    );
    }
  },[account])

  const handleVisibility=()=>{
    setVisibility(!visibility)
  }

  const handleInput =(input,value)=>{
    setFormValues({...formValues,[input]:value})
  }
  const handleSubmit = async() => {
    const {username, password, accountTitle} = formValues
  if(username === null || password === null || accountTitle === null) {
    setModalState(true);
  } else{
    if(item && editableInputs){
      dispatch(updateAccount({formValues,account_id:item._id}))
    }else if(item && !editableInputs){
      setEditableInputs(true)
    }else if(item === undefined){
      dispatch(addAccount(formValues));
    } 
  }
  }

  const cancelButton = ()=>{
    if(editableInputs && item){
      setEditableInputs(false)
    }else if(!editableInputs && item){
      Alert.alert(
        'Delete Account',
        'Are you sure you want to delete this account?',
        [{ text: "Don't delete it", style: 'cancel', onPress: () => {} },
         {  text: 'Delete', 
            style: 'destructive', 
            onPress: async() => {
              dispatch(deleteAccount(item._id))
            }
          }
        ]
      )   
    }
  }

  return (
    <ScrollView contentContainerStyle={style.backgroundView}>
      <View style={style.backButton}>
        <IconButton onPress={()=>navigation.goBack()} icon='chevron-left' size={50} color="white"/>
      </View>
      { item ? editableInputs ? <Text style={style.CRUDTitle}>Update Account</Text>: 
        <Text style={style.CRUDTitle}>Account</Text>:
        <Text style={style.CRUDTitle}>Create Account</Text>
      }
      <View style={style.loginForm}>
        <View style={style.inputsView}>
          <View style={style.inputView}>
            <Text style={style.inputTitleTextStyle}>Account:</Text>
            <TextInput 
              style={[style.inputStyles,editableInputs ? style.editingInput : style.disabledInput ]} 
              placeholder='Business instagram'
              value={formValues.accountTitle}
              editable={editableInputs}
              onChangeText={(value)=>handleInput('accountTitle',value)}
              placeholderTextColor='#ACACAC'
            />
          </View>
          <View style={style.inputView}>
            <Text style={style.inputTitleTextStyle}>Username:</Text>
            <TextInput 
              style={[style.inputStyles,editableInputs ? style.editingInput : style.disabledInput ]} 
              placeholder='example@mail.com'
              value={formValues.username}
              editable={editableInputs}
              onChangeText={(value)=>handleInput('username',value)}
              autoComplete='username'
              placeholderTextColor='#ACACAC'
            />
          </View>
          <View style={style.inputView}>
            <Text style={style.inputTitleTextStyle}>Password:</Text>
            <View >
              <TextInput 
              style={[style.inputStyles,editableInputs ? style.editingInput : style.disabledInput ]}
              placeholder='one-secure-password'
              value={formValues.password}
              placeholderTextColor='#ACACAC'
              editable={editableInputs}
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
            <Text style={style.submitButtonText}>{item ? !editableInputs ?'Edit':'Update':'Save'}</Text>
          </TouchableOpacity>
          {item && <TouchableOpacity 
            style={style.submitButton}
            onPress={cancelButton}
            >
            <Text style={style.cancelButtonText}>{item ? editableInputs ?'Cancel':'Delete':''}</Text>
          </TouchableOpacity>}
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
    borderRadius:5,
    borderColor:'white',
    fontWeight:'bold',
    color:'black',
    fontSize:20,
    paddingVertical:6,
  },
  disabledInput:{
    backgroundColor:'#DFDFDF',
  },
  editingInput:{
    backgroundColor:'white',
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
  cancelButtonText:{
    alignSelf:'center',
    color:'#FF6565',
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
  },
  backButton:{
    alignSelf:'flex-start',
    marginBottom:'50%',
    marginTop:'3%'
  },
  CRUDTitle:{
    fontSize:30,
    fontWeight:'bold',
    color:'white',
  }
})

export default AccountCrudScreen;
