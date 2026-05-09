import { createAsyncThunk, isRejectedWithValue } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const GetData = createAsyncThunk("GetData", async () => {
  try {
    // await new Promise((resolve) => setTimeout(resolve, 3000));
    const Response = await fetch(
      "http://localhost:5194/api/Projects/GetProjects",
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
});
const FeedSlice = createSlice({
  name: "feed",
  initialState: {
    isloading: false,
    GetData: [],
    error: null,
    SetCategory: "",
    rejected: false,
  },
  extraReducers: (builder) => {
    (builder.addCase(GetData.pending, (state) => {
      state.isloading = true;
      state.rejected = false;
    }),
      builder.addCase(GetData.fulfilled, (state, action) => {
        state.isloading = false;
        state.GetData = action.payload;
      }),
      builder.addCase(GetData.rejected, (state, action) => {
        state.isloading = false;
        state.error = action.error.message;
        state.rejected = true;
      }));
    FilterCategory: (state, action) => {
      state.SetCategory = action.payload;
    };
  },
});
export default FeedSlice.reducer;
