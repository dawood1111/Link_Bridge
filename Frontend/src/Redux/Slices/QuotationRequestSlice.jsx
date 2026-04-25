import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
export const FetchData = createAsyncThunk(
  "FetchUserProject",
  async (_, { rejectWithValue }) => {
    try {
      const Response = await fetch(
        "http://localhost:5194/api/quotations/getQuotationsByProject",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        },
      );

      if (!Response.ok) {
        return rejectWithValue({ message: `Server error: ${Response.status}` });
      }

      const data = await Response.json();
      return data;
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  },
);
const UserProjectSlice = createSlice({
    
  name: "UserProject",
  initialState: {
    isloading: false,
    UserProjectData: [],
    error: null,
  },
  extraReducers: (builder) => {
    (builder.addCase(FetchData.pending, (state) => {
      state.isloading = true;
    }),
      builder.addCase(FetchData.fulfilled, (state, action) => {
        state.isloading = false;
        state.UserProjectData = action.payload;
        state.error = null;
      }),
      builder.addCase(FetchData.rejected, (state, action) => {
        state.isloading = false;
        state.UserProjectData = [];
        state.error = action.payload || {
          message: "Failed to fetch user projects",
        };
      }));
  },
});
export default UserProjectSlice.reducer;
