import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import loginWS from '../../networking/endpoint/loginWS';

const initialState ={
    login:0
}
const loginSlice = createSlice({
    name:'Login',
    initialState,
    reducers:{
        setLogin:(state)=> state.login ++
    }
    
})

export const {setLogin} = loginSlice.actions;
export default loginSlice.reducer;