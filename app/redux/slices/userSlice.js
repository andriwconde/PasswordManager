import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import  userWS  from '../../networking/endpoint/userWS'
import * as Keychain from 'react-native-keychain';
import config from '../../config/config';
import { Alert } from 'react-native';

const initialState = {
  loading: 'idle',
  version: null,
  registered: null,
  loggedUser: null,
  error:''
}

export const userLogin = createAsyncThunk(
    'users/login',
    async ({formValues, navigation}) => {
      try{
        const response = await userWS.login(formValues)
        if(response.data.status === 'error'){
          Alert.alert('error',response.data.message)
        }else if(response.data.status === 'success'){
          Alert.alert(`Welcome ${response.data.data.user.name}` ,)
          const keychainRes = await Keychain.setGenericPassword(formValues.email, formValues.password);
          navigation.navigate('Start')
        }
        return response.data
      }catch(err){
        console.log(err)
      }
    }
  )

export const userRegister = createAsyncThunk(
  'users/register',
  async (userCred) => {
    try{
      const response = await userWS.register(userCred)
      return response.data
    }catch(err){
      console.log(err)
    }
  }
)

export const appVersion = createAsyncThunk(
  'users/version',
  async () => {
    try{
      const response = await userWS.version()
      return response.data
    }catch(err){
      console.log(err)
    }
  }
)
  
  // Then, handle actions in your reducers:
  const usersSlice = createSlice({
    name: 'users',
    initialState,
    extraReducers: (builder) => {
      builder.addCase(appVersion.pending, (state) => {
        state.loading='LOADING'
      })
      builder.addCase(appVersion.fulfilled, (state,action) => {
        state.loading = 'FULFILLED'
        state.version = action.payload
      })
      builder.addCase(appVersion.rejected, (state,action) => {
        state.loading = 'REJECTED'
        state.version = ''
        state.error = action.error.message
      })
//-------register-----------------------------------------

      builder.addCase(userRegister.pending, (state) => {
        state.loading='LOADING'
      })
      builder.addCase(userRegister.fulfilled, (state,action) => {
        state.loading = 'FULFILLED'
        state.registered = action.payload.data
      })
      builder.addCase(userRegister.rejected, (state,action) => {
        state.loading = 'REJECTED'
        state.registered = 'error'
        state.error = action.error.message
      })

//----login------------------------------------------------------
      builder.addCase(userLogin.pending, (state) => {
        state.loading='LOADING'
      })
      builder.addCase(userLogin.fulfilled, (state,action) => {
        state.loading = 'FULFILLED'
        state.loggedUser = action.payload
      })
      builder.addCase(userLogin.rejected, (state,action) => {
        state.loading = 'REJECTED'
        state.version = ''
        state.error = action.error.message
      })
      
    },
  })

  module.exports = usersSlice.reducer
  module.exports.appVersion = appVersion
  module.exports.userRegister = userRegister
  module.exports.userLogin = userLogin
