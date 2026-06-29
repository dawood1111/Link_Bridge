import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const NotificationData = createAsyncThunk(
  "NotificationData",
  async (Data) => {
    try {
      const Response = await fetch(
        "http://localhost:5194/api/Notification/SendNotification",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(Data),
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
  },
);

const NotificationSlice = createSlice({
  name: "Notification",
  initialState: {
    isLoading: false,
    NotificationData: [],
    error: null,
  },
  extraReducers: (builder) => {
    (builder.addCase(NotificationData.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(NotificationData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.NotificationData = action.payload;
        state.error = null;
      }),
      builder.addCase(NotificationData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      }));
  },
});
export default NotificationSlice.reducer;
