import React,{useEffect, useState} from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from '../redux/slices/userSlice'

const RegisterScreen =({navigation})=>{
  const dispatch = useDispatch()
  const registered = useSelector(state=>state.registered)
  const [formValues,setFormValues] = useState({
    name:'',
    surname:'',
    email:'',
    password:''
  })

  useEffect(() => {

  },[registered])

  const handleInput =(input,value)=>{
    setFormValues({...formValues,[input]:value})
  }

  const handleSubmit = (formValues) => {
    dispatch(userRegister(formValues)).then(res=>{
      if(res.payload.data){
        Alert.alert('registro exitoso')
        navigation.navigate('Login')
      }
    })

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
          <TextInput 
          style={style.inputStyles} 
          secureTextEntry={true}
          onChangeText={(value)=>handleInput('password',value)}
          placeholder='one-secure-password'
          placeholderTextColor='#ACACAC'
          />
        </View>
        <TouchableOpacity 
          style={style.submitButton}
          onPress={()=>handleSubmit(formValues)}
          >
          <Text style={style.submitButtonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
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
      }
})
export default RegisterScreen