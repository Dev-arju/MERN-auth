import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/user/userSlice'
import adminReducer from './slices/admin/adminSlice'
import usersReducer from './slices/admin/usersSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        admin: adminReducer,
        usersList: usersReducer
    },
    middleware: (getDefaultMiddleware) =>  getDefaultMiddleware(),
    devTools: true
})

export default store;