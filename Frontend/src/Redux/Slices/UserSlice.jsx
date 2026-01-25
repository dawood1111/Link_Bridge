import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const FetchData = createAsyncThunk(
  'FetchUser',
  async (UserData, { rejectWithValue }) => {
    try {
      const Response = await fetch("http://localhost:5194/api/User/CreteUser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(UserData)
      });

      const data = await Response.json();

      if (!Response.ok) {
        return rejectWithValue(data);
      }

      return data;
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

const UserSlice = createSlice({
  name: 'SignUpUser',
  initialState: {
    isloading: false,
    userInfo: null,
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {  // FIX: "extraReducers" not "extrareducers"
    builder
      .addCase(FetchData.pending, (state) => {
        state.isloading = true;
        state.error = null;
      })
      .addCase(FetchData.fulfilled, (state, action) => {
        state.isloading = false;
        state.userInfo = action.payload;
        state.error = null;
      })
      .addCase(FetchData.rejected, (state, action) => {
        state.isloading = false;
        state.userInfo = null;
        state.error = action.payload || { message: 'Sign up failed' };
      });
  }
});

export const { clearError } = UserSlice.actions;
export default UserSlice.reducer;