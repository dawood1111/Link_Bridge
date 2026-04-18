import { configureStore } from "@reduxjs/toolkit";  
import userReducer from "./Slices/UserSlice";  
import signInReducer from "./Slices/SignInSlice";  
import feedReducer from "./Slices/FeedSlice";
import AllCompaniesReducer from "./Slices/GetCompanies";
import SearchQueryReducer from "./Slices/SearchQuery";
import UserProjects from "./Slices/UserProjectSlice";
import ModalSlice from "./Slices/ModalSlice";
import PostQuotationReducer from "./Slices/PostQuotationSlice";

export const store =configureStore({
    reducer:{
        user:userReducer,
        user2:signInReducer,
        feed:feedReducer,
        AllCompanies:AllCompaniesReducer,
        SearchQuery:SearchQueryReducer,
        userProjectsSlice:UserProjects,
        modal:ModalSlice,
        quotationForm:PostQuotationReducer


    }
})