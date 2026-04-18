import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";




export const GetData=createAsyncThunk('GetData',async()=>{
    const Response= await fetch('http://localhost:5194/api/Projects/GetProjects',{
        method:'GET',
        headers:{
            'Content-Type':'application/json'
        }
        ,
        credentials:'include'

    });
    const data=await Response.json();
   
    if(!Response.ok){
      return rejectedWithValue(data);
    }
    return await data;




});
const FeedSlice = createSlice({
    name: 'feed',
    initialState:{
        isloading:false,
        GetData:[],
        error:null
    },
    extraReducers:(builder)=>{
        builder.addCase(GetData.pending,(state)=>{
            state.isloading=true;
}),
        builder.addCase(GetData.fulfilled,(state,action)=>{
            state.isloading=false;
            state.GetData=action.payload;
}),
        builder.addCase(GetData.rejected,(state,action)=>{
            state.isloading=false;
            state.error=action.error.message;
})
    }
})
export default FeedSlice.reducer;