import { configureStore } from "@reduxjs/toolkit";  
import userReducer from "./Slices/UserSlice";  
import signInReducer from "./Slices/SignInSlice";  
import feedReducer from "./Slices/FeedSlice";
import AllCompaniesReducer from "./Slices/GetCompanies";
import SearchQueryReducer from "./Slices/SearchQuery";
import UserProjectsSlice from "./Slices/QuotationRequestSlice";
import ModalSlice from "./Slices/ModalSlice";
import PostQuotationReducer from "./Slices/PostQuotationSlice";
import Projects from "./Slices/ProjectsSlice"; 

export const store =configureStore({
    reducer:{
        user:userReducer,
        user2:signInReducer,
        feed:feedReducer,
        AllCompanies:AllCompaniesReducer,
        SearchQuery:SearchQueryReducer,
        allUserprojects:UserProjectsSlice,
        modal:ModalSlice,
        quotationForm:PostQuotationReducer,
        UserProjects:Projects


    }
})