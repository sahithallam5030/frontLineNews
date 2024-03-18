import {configureStore} from '@reduxjs/toolkit'
import newsReducer from './slices/newsSlice'
import userReducer from './slices/userSlice'

export const store=configureStore({
    reducer:{
        users:userReducer,
        news:newsReducer
    }
})