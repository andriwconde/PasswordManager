import { createSlice } from '@reduxjs/toolkit';

const loginSlice = createSlice({
    name:'login',
    initialState:{
        contador:0
    },
    reducers:{
        increase: (state, action) => {
            state.contador ++
        },
        decrease: (state, action) => {
            state.contador --
        }
    }
})

export const increase = loginSlice.actions.increase
export const decrease = loginSlice.actions.decrease
export default loginSlice.reducer;