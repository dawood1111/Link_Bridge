import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const PostData = createAsyncThunk(
  "PostQuotation",
  async (Data, { rejectWithValue }) => {
  
     
        

      const Response = await fetch("http://localhost:5194/api/quotations/generate",

        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

            credentials: "include",

          body: JSON.stringify(Data),
        },
      );

      if (!Response.ok) {
        const Error = await Response.json();
        return rejectWithValue(Error);
      }
      return await Response.json();
   
    
  },
);
const PostQuotationSlice = createSlice({
  name: "PostQuotation",
  initialState: {
    isloading: false,
    PostData: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(PostData.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(PostData.fulfilled, (state, action) => {
      state.isloading = false;
      state.PostData = action.payload;
      state.error = null;
    });
    builder.addCase(PostData.rejected, (state, action) => {
      state.isloading = false;
      state.PostData = [];
      state.error = action.payload || { message: "Failed to post quotation" };
    });
  },
});
export default PostQuotationSlice.reducer;
