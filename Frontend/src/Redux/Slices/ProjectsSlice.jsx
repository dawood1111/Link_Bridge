import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export const GetData = createAsyncThunk("FetchProjects", async () => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const Response = await fetch(
      "http://localhost:5194/api/Projects/GetUserProjects",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      },
    );
    if (!Response.ok) {
      const Error = await Response.json();
      return Error;
    }

    const data = await Response.json();
    return data;
  } catch (error) {
    return { message: "Network Error: Server is unreachable" };
  }
});
const ProjectsSlice = createSlice({
  name: "Projects",
  initialState: {
    isloading: false,
    ProjectsData: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(GetData.pending, (state) => {
      state.isloading = true;
    });
    builder.addCase(GetData.fulfilled, (state, action) => {
      state.isloading = false;
      state.ProjectsData = action.payload;
      state.error = null;
    });
    builder.addCase(GetData.rejected, (state, action) => {
      state.isloading = false;
      state.ProjectsData = [];
      state.error = action.payload || { message: "Failed to fetch projects" };
    });
  },
});
export default ProjectsSlice.reducer;
