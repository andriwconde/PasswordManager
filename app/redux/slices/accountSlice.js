import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit'
import accountWS  from '../../networking/endpoint/accountWS'
import { Alert } from 'react-native';
import { RSA } from 'react-native-rsa-native';
import EncryptedStorage from 'react-native-encrypted-storage';


const initialState = {
  loading: 'idle',
  accounts: null,
  error:null
}

export const addAccount = createAsyncThunk(
  'account/add',
  async (account) => {
    try{
      console.log({account})
      let stringAccount = JSON.stringify(account);
      console.log({stringAccount})
      const keys = await RSA.generateKeys(4096)
      console.log({keys})
      const encodedMessage = await RSA.encrypt(stringAccount, keys.public)
      console.log({encodedMessage})
      const userId = await EncryptedStorage.getItem('userId')
      const payload = {}
      const decryptedMessage = await RSA.decrypt(encodedMessage, keys.private)
      console.log({decryptedMessage:JSON.parse(decryptedMessage)})
    }catch(err){
      console.log(err)
    }
  }
)
  
  // Then, handle actions in your reducers:
  const acountSlice = createSlice({
    name: 'account',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
//-------addAccount-----------------------------------------

      builder.addCase(addAccount.pending, (state) => {
        state.loading='LOADING'
      })
      builder.addCase(addAccount.fulfilled, (state,action) => {
        state.loading = 'FULFILLED'
        state.registered = action.payload
      })
      builder.addCase(addAccount.rejected, (state,action) => {
        state.loading = 'REJECTED'
        state.registered = 'error'
        state.error = action.error.message
      })
    },
  })

  module.exports = acountSlice.reducer
  module.exports.addAccount = addAccount
