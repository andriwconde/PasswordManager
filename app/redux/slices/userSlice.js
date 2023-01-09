import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import  userWS  from '../../networking/endpoint/userWS'

const initialState = {
  loading: 'idle',
  version: null,
  error:''
}

const userLogin = createAsyncThunk(
    'users/login',
    async (userCred) => {
      const response = await userWS.login(userCred)
      return response.data
    }
  )

  const userRegister = createAsyncThunk(
    'users/register',
    async (userCred) => {
      const response = await userWS.register(userCred)
      return response.data
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
        console.log(action)
      })
      
    },
  })

  module.exports = usersSlice.reducer
  module.exports.appVersion = appVersion
