import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const GetNotficationData = createAsyncThunk(
  "GetNotficationData",
  async () => {
    try {
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      const Response = await fetch(
        "http://localhost:5194/api/Notification/GetNotifications",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      if (!Response.ok) {
        return rejectedWithValue(data);
      }
      const data = await Response.json();
      return await data;
    } catch (error) {
      return rejectWithValue(
        error.message || "Network Error: Server is unreachable",
      );
    }
  },
);
const NotificationSlice = createSlice({
  name: "Notification",
  initialState: {
    isloading: false,
    GetNotficationData: [],
    error: null,
    rejected: false,
  },
  extraReducers: (builder) => {
    (builder.addCase(GetNotficationData.pending, (state) => {
      state.isloading = true;
      state.rejected = false;
    }),
      builder.addCase(GetNotficationData.fulfilled, (state, action) => {
        state.isloading = false;
        state.GetNotficationData = action.payload;
      }),
      builder.addCase(GetNotficationData.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.error.message;
        state.rejected = true;
      }));
  },
});
export default NotificationSlice.reducer;
