import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit'
import  userWS  from '../../networking/endpoint/userWS'
import { Alert } from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';


const initialState = {
  loading: 'idle',
  version: null,
  registered: null,
  loggedUser: null,
  error:''
}

export const userLogin = createAsyncThunk(
    'users/login',
     async (formValues) => {
      try{
        const response = await userWS.login(formValues);
        if(response.data.status === 'error'){
          Alert.alert('error',response.data.message);
        }else if(response.data.status === 'success'){
          if(!response.data.data.user.publicKey){
            Alert.alert(`Welcome ${response.data.data.user.name}`);
            return response.data.data
          }else if(response.data.data.user.publicKey){
            Alert.alert(`Biometric Login set correctly`);
            await EncryptedStorage.setItem(
              'userId',
              response.data.data.user.id,
            );
            return response.data.data
          }
        }else{
          Alert.alert(`Incorrect credentials`)
        }
      }catch(err){
        if (err.code === "ECONNABORTED"){
          Alert.alert('comunication error with server',err.message)
        }else{
          Alert.alert('error with the request',err)
          console.log('passwordManager',err)
        }
      }
    }
  )

  export const userBioLogin = createAsyncThunk(
    'users/bioLogin',
    async (userCred) => {
      try{
        const response = await userWS.bioLogin(userCred)
        if(response.data.status === 'success'){
          Alert.alert(`Welcome ${response.data.data.user.name}`);
          return response.data.data
        }else if(response.data.status === 'error'){
          Alert.alert(`error ${response.data.code}`,response.data.message);
        } 
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
      if(response.data.status === 'success'){
        Alert.alert(`Successful Registration`);
        return response.data
      }else if(response.data.status === 'error'){
        Alert.alert(`error ${response.data.code}`,response.data.message);
        return response.data
      } 
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

const userLogOut = createAction('user/logOut')
  
  // Then, handle actions in your reducers:
  const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
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
        state.registered = action.payload.status === 'success' ? true : false
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
        state.error = action.error.message
      })

//-----bioLogin-------------------------------------------------------
      builder.addCase(userBioLogin.pending, (state) => {
        state.loading='LOADING'
      })
      builder.addCase(userBioLogin.fulfilled, (state,action) => {
        state.loading = 'FULFILLED'
        state.loggedUser = action.payload
      })
      builder.addCase(userBioLogin.rejected, (state,action) => {
        state.loading = 'REJECTED'
        state.error = action.error.message
      })
//-----simple reducers -----------------------------------------------
      builder.addCase(userLogOut, (state) => {
        state.loggedUser = null
      })
    },
  })

  module.exports = usersSlice.reducer
  module.exports.appVersion = appVersion
  module.exports.userRegister = userRegister
  module.exports.userLogin = userLogin
  module.exports.userBioLogin = userBioLogin
  module.exports.userLogOut = userLogOut
