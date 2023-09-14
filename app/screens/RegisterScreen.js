import React,{useEffect, useState} from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Modal, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { userRegister,cleanRegister } from '../redux/slices/userSlice'
import Icon from 'react-native-vector-icons/MaterialIcons';

const RegisterScreen =({navigation})=>{
  const dispatch = useDispatch()
  const registered = useSelector(state=>state.user.registered)
  const loading = useSelector(state=>state.user.loading)
  const [visibility, setVisibility]= useState(false)
  const [modalState, setModalState] = useState(false)
  const [formValues,setFormValues] = useState({
    name:'',
    surname:'',
    email:'',
    password:''
  })

  useEffect(() => {
    if(registered){
      navigation.navigate('Login')
      dispatch(cleanRegister())
    }
  },[registered])

  const handleInput =(input,value)=>{
    setFormValues({...formValues,[input]:value})
  }

  const handleVisibility=()=>{
    setVisibility(!visibility)
  }

  const handleSubmit = async () => {
    const {name, surname, email,password} = formValues
    if(email === null || password === null|| name === null || surname === null) {
     setModalState(true);
   } else{
    dispatch(userRegister(formValues))
   }
  }

return (
<View style={style.backgroundView}>
  <View style={style.loginForm}>
    <View style={style.loginTitle}>
      <Text style={style.titleText}>Register</Text>
    </View>
    <View style={style.inputsView}>
      <View style={style.inputView}>
          <Text style={style.inputTitleTextStyle}>Name:</Text>
          <TextInput 
            style={style.inputStyles} 
            placeholder='john'
            onChangeText={(value)=>handleInput('name',value)}
            autoComplete='name'
            placeholderTextColor='#ACACAC'
          />
        </View>
        <View style={style.inputView}>
          <Text style={style.inputTitleTextStyle}>Surname:</Text>
          <TextInput 
            style={style.inputStyles} 
            placeholder='Doe'
            onChangeText={(value)=>handleInput('surname',value)}
            autoComplete='name-middle'
            placeholderTextColor='#ACACAC'
          />
        </View>
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
          onPress={handleSubmit}
          >
          <Text style={style.submitButtonText}>Register</Text>
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
      {loading === 'LOADING' && 
        <View style={style.loadingContainer}>
          <ActivityIndicator size="large" color="#374FC6" />
        </View>}
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
      loginForm:{
        height:'50%',
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
      textColorStyle:{
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
        borderTopColor:'white'
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
        fontSize:20,
        fontWeight:'bold',
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
export default RegisterScreen