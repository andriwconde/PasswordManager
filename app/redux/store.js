import { configureStore,   } from '@reduxjs/toolkit'

import userReducer from './slices/userSlice'
import accountReducer from './slices/accountSlice'

export const store = configureStore({
    reducer:{
        user: userReducer,
        account: accountReducer
    }
});
