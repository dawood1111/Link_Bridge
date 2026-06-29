
import { createSlice,createAsyncThunk } from '@reduxjs/toolkit';


export const FetchSearchQuery=createAsyncThunk('SearchQuery/fetch',async({CompanyName})=>{
     await new Promise((resolve) => setTimeout(resolve, 4000));

    const params = new URLSearchParams();
          if (CompanyName) params.append('CompanyName', CompanyName);
          const Response=await fetch(`http://localhost:5194/api/AboutUser/GetCompanyProfile?CompanyName=${CompanyName}`,{
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

   
const SearchQuery=createSlice({
    name:'SearchQuery',
    initialState:{  
        isloading:false,
        SearchData:[],
        error:null,
        isEmpty:false,
        notMatching:false

    },
    extraReducers:(builder)=>{
        builder.addCase(FetchSearchQuery.pending,(state)=>{ 
            state.isloading=true;
            

        }),
        builder.addCase(FetchSearchQuery.fulfilled,(state,action)=>{
            state.isloading=false;  
            state.SearchData=action.payload;
            state.error=null;
            state.isEmpty = action.payload.length === 0;
            
        }),
        builder.addCase(FetchSearchQuery.rejected,(state,action)=>{     
            state.isloading=false;
            state.SearchData=[];
            state.error=action.payload || {message:'Failed to fetch search results'};
        }   
        )
    }
})  
export default SearchQuery.reducer;