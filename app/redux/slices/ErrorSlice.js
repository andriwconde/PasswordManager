import { createSlice } from '@reduxjs/toolkit';

const initialState ={
    loading:'START',
    data:[],
    error:''
}
const loginSlice = createSlice({
    name:'Login',
    initialState,
    reducers:{
        loadingStart:(state)=> {state.loading='LOADING'},
        loadingError:(state,payload)=>{
            state.loading='ERROR'
            state.data=payload
        },
        loadingSuccess:(state)=>{state.loading='SUCCES'}
    }
    
})

export const {loadingStart,loadingError,loadingSuccess} = loginSlice.actions;
export default loginSlice.reducer;