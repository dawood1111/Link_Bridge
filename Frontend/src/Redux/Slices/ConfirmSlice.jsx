import { createSlice } from "@reduxjs/toolkit";

const ConfirmModal = createSlice({
  name: "ConfirmModal",
  initialState: {
    showConfirm: false,
  },
  reducers: {
    OpenConfirm: (state) => {
      state.showConfirm = true;
    },
    CloseConfirm: (state) => {
      state.showConfirm = false;
    },
  },
});
