import { createSlice} from "@reduxjs/toolkit";
const ModalSlice=createSlice({
    name:'Modal',
    initialState:{  
        isOpen:false,
        Item:{},
        projectData:null
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
            
        }
    }
})
export const {OpenModal,CloseModal}=ModalSlice.actions;
export default ModalSlice.reducer;