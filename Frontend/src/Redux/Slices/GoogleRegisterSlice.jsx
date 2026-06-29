import react from "react";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const GoogleRegister = createAsyncThunk(
  "GoogleRegister",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "http://localhost:5194/api/Google/register-google",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(userData),
        },
      );
      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Network Error: Server is unreachable",
      );
    }
  },
);
const GoogleRegisterSlice = createSlice({
  name: "GoogleRegister",
  initialState: {
    isLoading: false,
    userInfo: null,
    error: null,
  },
  extraReducers: (builder) => {
    (builder.addCase(GoogleRegister.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    }),
      builder.addCase(GoogleRegister.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userInfo = action.payload;
        state.error = null;
      }),
      builder.addCase(GoogleRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || action.error.message;
      }));
  },
});
export default GoogleRegisterSlice.reducer;
