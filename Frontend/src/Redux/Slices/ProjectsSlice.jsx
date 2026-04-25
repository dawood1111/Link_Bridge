import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const GethData=createAsyncThunk('FetchProjects',async()=>{
    const Response= await fetch('http://localhost:5194/api/Projects/GetUserProjects',{
        method:'GET',
        headers:{   
            'Content-Type':'application/json'
        },
        credentials:'include'
    });
    const data=await Response.json();
    if(!Response.ok){
        const Error=await Response.json();
        return Error;
    }
    return data;
});
const ProjectsSlice=createSlice({
    name:'Projects',    
    initialState:{
        isloading:false,
        ProjectsData:[],    
        error:null
    },
    extraReducers:(builder)=>{
        builder.addCase(GethData.pending,(state)=>{
            state.isloading=true;
        }

        ),
        builder.addCase(GethData.fulfilled,(state,action)=>{
            state.isloading=false;  
            state.ProjectsData=action.payload;
            state.error=null;
        }),
        builder.addCase(GethData.rejected,(state,action)=>{
            state.isloading=false;  
            state.ProjectsData=[];
            state.error=action.payload || {message:'Failed to fetch projects'};
        }
        )
    }
})
export default ProjectsSlice.reducer;
