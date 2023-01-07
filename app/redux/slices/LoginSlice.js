import { createSlice, createAsyncThunk, } from '@reduxjs/toolkit';
import loginWS from '../../networking/endpoint/loginWS';

const initialState ={
    loginValue:0
}
const loginSlice = createSlice({
    name:'Login',
    initialState,
    reducers:{
        setLogin:(state)=> {state.loginValue++;}
    }
    
})

export const {setLogin} = loginSlice.actions;
export default loginSlice.reducer;