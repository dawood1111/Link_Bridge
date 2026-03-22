import { createAsyncThunk } from "@reduxjs/toolkit";    
import { createSlice } from "@reduxjs/toolkit"; 



export const FetchData=createAsyncThunk('FetchUser',async (UserData)=>{

    const Response= await fetch('http://localhost:5194/api/User/Login',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
            
        },
        credentials:'include',
        body:JSON.stringify(UserData)
    });
    if(!Response.ok){

         const Error = await Response.json();
        return rejectWithValue(Error);
    }
 
        return await Response.json();
    
    
})
const SignInSlice=createSlice({
    name:'SignInUser',
    initialState:{
        isloading:false,
        userInfo:null,
        error:null
    },
    extraReducers:(builder)=>{
        builder.addCase(FetchData.pending,(state)=>{
            state.isloading=true;
        }),
        builder.addCase(FetchData.fulfilled,(state,action)=>{
            state.isloading=false;
            state.userInfo=action.payload;
            state.error=null;  
        }),
        builder.addCase(FetchData.rejected,(state,action)=>{
         
            state.error=true;
        })
    }
})
export default SignInSlice.reducer;