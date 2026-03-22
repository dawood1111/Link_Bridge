import { configureStore } from "@reduxjs/toolkit";  
import userReducer from "./Slices/UserSlice";  
import signInReducer from "./Slices/SignInSlice";  
import feedReducer from "./Slices/FeedSlice";
import AllCompaniesReducer from "./Slices/GetCompanies";
import SearchQueryReducer from "./Slices/SearchQuery";
export const store =configureStore({
    reducer:{
        user:userReducer,
        user2:signInReducer,
        feed:feedReducer,
        AllCompanies:AllCompaniesReducer,
        SearchQuery:SearchQueryReducer        
    }
})