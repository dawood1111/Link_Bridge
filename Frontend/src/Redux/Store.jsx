import { configureStore } from "@reduxjs/toolkit";  
import userReducer from "./Slices/UserSlice";  
import signInReducer from "./Slices/SignInSlice";  
export const store =configureStore({
    reducer:{
        user:userReducer,
        user2:signInReducer
        
    }
})