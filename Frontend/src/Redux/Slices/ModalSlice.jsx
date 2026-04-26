import { createSlice} from "@reduxjs/toolkit";
const ModalSlice=createSlice({
    name:'Modal',
    initialState:{  
        isOpen:false,
        Item:{},
        projectData:null,
        Confirm:false,


    },
    reducers:{
        OpenModal:(state,action)=>{
            state.isOpen=true;
            state.Item=action.payload;
            state.projectData=action.payload;

        },
        CloseModal:(state)=>{
            state.isOpen=false;
            state.Item={};
            state.projectData=null;
            
        },
         OpenConfirm:(state,action)=>{
            state.Confirm=true;
            state.Item={}

         },
         CloseConfirm:(state,action)=>{
            state.Confirm=false

         }
    }
})
export const {OpenModal,CloseModal,OpenConfirm,CloseConfirm}=ModalSlice.actions;
export default ModalSlice.reducer;

