import { createAsyncThunk, createSlice, createAction } from '@reduxjs/toolkit'
import accountWS  from '../../networking/endpoint/accountWS'
import { Alert } from 'react-native';
import { RSA } from 'react-native-rsa-native';
import EncryptedStorage from 'react-native-encrypted-storage';

const initialState = {
  loading: 'idle',
  accounts: null,
  account: null,
  error:null
}


export const addAccount = createAsyncThunk(
  'account/add',
  async (account) => {
    try{
      const user_id = await EncryptedStorage.getItem('user_id');
      const backendPK = await EncryptedStorage.getItem('backendPK');
      const stringAccount = JSON.stringify({...account});
      const encryptedAccount = await RSA.encrypt(stringAccount, backendPK)
      const response = await accountWS.addAccount({encryptedAccount,user_id})
      return response.data.data.newAccount
      
    }catch(err){
      console.log(err)
    }
  }
)

export const updateAccount = createAsyncThunk(
  'account/update',
  async ({formValues,account_id}) => {
    try{
      const backendPK = await EncryptedStorage.getItem('backendPK');
      const stringAccount = JSON.stringify({...formValues});
      const encryptedAccount = await RSA.encrypt(stringAccount, backendPK)
      const response = await accountWS.updateAccount({encryptedAccount, account_id})
      return response.data.data
    }catch(err){
      console.log(err)
    }
  }
)

export const deleteAccount = createAsyncThunk(
  'account/delete',
  async (account_id) => {
    try{
      const response = await accountWS.deleteAccount({account_id})
      return response.data.data
    }catch(err){
      console.log(err)
    }
  }
)

export const getAccounts = createAsyncThunk(
  'account/getAccounts',
  async ()=>{
    try{
      const user_id = await EncryptedStorage.getItem('user_id');
      const encrytedAccounts = await accountWS.getAccounts({user_id})
      const keys = JSON.parse(await EncryptedStorage.getItem('transferKeys'));
      const decryptedAccounts = await Promise.all( encrytedAccounts.data.data.map(async (account)=>{
         return  JSON.parse(await RSA.decrypt(account,keys.private))
      }))
      return decryptedAccounts
    }catch(err){
      console.log(err)
    }
  }
) 

const accountStateClear = createAction('account/clear')
  
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
        state.account = action.payload.user_id ? true: false
      })
      builder.addCase(addAccount.rejected, (state,action) => {
        state.loading = 'REJECTED'
        state.account = 'error'
        state.error = action.error.message
      })
//-------getAccounts-----------------------------------------

      builder.addCase(getAccounts.pending, (state) => {
        state.loading='LOADING'
      })
      builder.addCase(getAccounts.fulfilled, (state,action) => {
        state.loading = 'FULFILLED'
        state.accounts = action.payload
      })
      builder.addCase(getAccounts.rejected, (state,action) => {
        state.loading = 'REJECTED'
        state.accounts = 'error'
        state.error = action.error.message
      })
//----------------updateAccount-----------------------------------------

      builder.addCase(updateAccount.pending, (state) => {
        state.loading='LOADING'
      })
      builder.addCase(updateAccount.fulfilled, (state,action) => {
        state.loading = 'FULFILLED'
        state.account = action.payload
      })
      builder.addCase(updateAccount.rejected, (state,action) => {
        state.loading = 'REJECTED'
        state.account = 'error'
        state.error = action.error.message
      })
//------------------deleteAccount-----------------------------------------
      builder.addCase(deleteAccount.pending, (state) => {
        state.loading='LOADING'
      })
      builder.addCase(deleteAccount.fulfilled, (state,action) => {
        state.loading = 'FULFILLED'
        state.account = action.payload
      })
      builder.addCase(deleteAccount.rejected, (state,action) => {
        state.loading = 'REJECTED'
        state.account = 'error'
        state.error = action.error.message
      })
//-----simple reducers -----------------------------------------------
      builder.addCase(accountStateClear, (state) => {
        state.account = false
      })
    },
  })

  module.exports = acountSlice.reducer
  module.exports.addAccount = addAccount
  module.exports.updateAccount = updateAccount
  module.exports.getAccounts = getAccounts
  module.exports.accountStateClear = accountStateClear
  module.exports.deleteAccount = deleteAccount

