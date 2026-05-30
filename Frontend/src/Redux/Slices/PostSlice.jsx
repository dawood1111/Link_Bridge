import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const PostData = createAsyncThunk("PostData", async (data) => {
  const formData = new FormData();
  formData.append("ProjectTitle", data.projectTitle);
  formData.append("ProjectLocation", data.projectLocation);
  formData.append("ProjectDescription", data.projectDescription);
  formData.append("ProjectSize", data.projectSize);
  formData.append("ProjectCategory", data.projectCategory);
  formData.append("StartDate", new Date(data.startDate).toISOString());
  formData.append("EndDate", new Date(data.endDate).toISOString());
  formData.append("MinBudget", parseFloat(data.minBudget));
  formData.append("MaxBudget", parseFloat(data.maxBudget));
  formData.append("ProjectStatus", data.projectStatus);
  data.imagesList.forEach((file, index) => {
    formData.append("ImagesList", file);
  });

  console.log("FormData sent:", formData);
  try {
    const Response = await fetch(
      "http://localhost:5194/api/Projects/PostProjects",
      {
        method: "POST",

        credentials: "include",
        body: formData,
      },
    );
    if (!Response.ok) {
      throw new Error("Failed to post data");
    }
    const responseData = await Response.json();
    return responseData;
  } catch (error) {
    throw new Error(error.message || "Network Error: Server is unreachable");
  }
});
const PostSlice = createSlice({
  name: "Post",
  initialState: {
    isLoading: false,
    PostData: [],
    error: null,
  },
  extraReducers: (builder) => {
    (builder.addCase(PostData.pending, (state) => {
      state.isLoading = true;
    }),
      builder.addCase(PostData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.PostData = action.payload;
      }),
      builder.addCase(PostData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      }));
  },
});
export default PostSlice.reducer;
export { PostData };
