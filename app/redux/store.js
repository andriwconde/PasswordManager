import { configureStore } from '@reduxjs/toolkit'

import loginSlice from './slices/LoginSlice';

export const store = configureStore({
    reducer:{
        login: loginSlice,
    
    }
});
