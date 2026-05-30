import { createSlice } from "@reduxjs/toolkit";
const ModalSlice = createSlice({
  name: "Modal",
  initialState: {
    isOpen: false,
    Item: null,
    projectData: null,
    Confirm: false,
  },
  reducers: {
    OpenModal: (state, action) => {
      state.isOpen = true;
      state.Item = action.payload;
      state.projectData = action.payload;
    },
    CloseModal: (state) => {
      state.isOpen = false;
      state.Item = null;
      state.projectData = null;
    },
    OpenConfirm: (state, action) => {
      state.Confirm = true;
    },
    CloseConfirm: (state, action) => {
      state.Confirm = false;
    },
  },
});
export const { OpenModal, CloseModal, OpenConfirm, CloseConfirm } =
  ModalSlice.actions;
export default ModalSlice.reducer;
