import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const FetchData = createAsyncThunk(
  "CompanySetup",
  async (CompanyInfo, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("CompanyName", CompanyInfo.companyName);
    formData.append("SolutionType", CompanyInfo.solutionType);
    formData.append("CompanyDescription", CompanyInfo.companyDescription);
    formData.append("ContactNumber", CompanyInfo.contactNumber);
    formData.append("Address", CompanyInfo.address);
    formData.append("StartedAt", new Date(CompanyInfo.startedAt).toISOString());
    formData.append("CompanySize", parseInt(CompanyInfo.companySize));
    formData.append("CompanyLogo", CompanyInfo.companyLogo);

    const Response = await fetch(
      "http://localhost:5194/api/AboutUser/PostCompanyProfile",
      {
        method: "POST",

        credentials: "include",

        body: formData,
      },
    );
    if (!Response.ok) {
      const Error = await Response.text();
      console.log("API Error:", Error);
      return rejectWithValue(Error);
    }

    return await Response.text();
  },
);
const SignInSlice = createSlice({
  name: "CompanySetuo",
  initialState: {
    isloading: false,
    userInfo: null,
    error: null,
  },
  extraReducers: (builder) => {
    (builder.addCase(FetchData.pending, (state) => {
      state.isloading = true;
    }),
      builder.addCase(FetchData.fulfilled, (state, action) => {
        state.isloading = false;
        state.userInfo = action.payload;
        state.error = null;
      }),
      builder.addCase(FetchData.rejected, (state, action) => {
        state.error = true;
      }));
  },
});
export default SignInSlice.reducer;
