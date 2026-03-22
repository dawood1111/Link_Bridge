import { createAsyncThunk } from "@reduxjs/toolkit";    
import { createSlice } from "@reduxjs/toolkit";

export const FetchData=createAsyncThunk('FetchAllComapanies',async()=>{
    const Response = await fetch('http://localhost:5194/api/AboutUser/GetAllCompanies',{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'include'
    })
    const data = await Response.json();
    if(!Response.ok){
        const Error = await Response.json();
        return Error;
    }
    return data;
   

})

const GetAllCompanies=createSlice({
    name:'GetAllCompanies',
    initialState:{
        isloading:false,
        GetData:[],
        error:null
    },
    extraReducers:(builder)=>{
        builder.addCase(FetchData.pending,(state)=>{
            state.isloading=true;
}),
        builder.addCase(FetchData.fulfilled,(state,action)=>{       
            state.isloading=false;
            state.GetData=action.payload;
            state.error=null;  
        }   
        ),
        builder.addCase(FetchData.rejected,(state,action)=>{    
            state.isloading=false;
            state.GetData=[];
            state.error=action.payload || {message:'Failed to fetch companies'};
        }
        )
    }
})
export default GetAllCompanies.reducer;