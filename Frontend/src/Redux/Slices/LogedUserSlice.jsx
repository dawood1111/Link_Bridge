import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const UserData = createAsyncThunk("UserLoged", async () => {
  try {
    const Response = await fetch(
      "http://localhost:5194/api/User/GetLogedUser",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },

        credentials: "include",
      },
    );
    if (!Response.ok) {
      throw new Error("Failed to send notification");
    }
    const responseData = await Response.json();
    return responseData;
  } catch (error) {
    throw new Error(error.message || "Network Error: Server is unreachable");
  }
});

const UserLogedSlice = createSlice({
  name: "UserLoged",
  initialState: {
    isLoading: false,
    UserData: [],
    error: null,
  },
  extraReducers: (builder) => {
    (builder.addCase(UserData.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(UserData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.UserData = action.payload;
        state.error = null;
      }),
      builder.addCase(UserData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      }));
  },
});
export default UserLogedSlice.reducer;
