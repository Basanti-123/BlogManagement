import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BlogServices from "../services/blog";

const initialState = {
  blogs: [],
  blog: {},
  currentPage: 1,
  total: 0,
  limit: 60,
  loading: false,
  error: "",
  success: "",
};

export const listBlogs = createAsyncThunk(
  "blogs/listBlogs",
  async ({ limit, page }) => {
    const res = await BlogServices.list(limit, page);
    return res.data;
  }
);

export const changeStatus = createAsyncThunk(
  "blogs/changeStatus",
  async (id) => {
    const res = await BlogServices.changeStatus(id);
    return res.data;
  }
);

export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (payload) => {
    const res = await BlogServices.create(payload);
    return res.data;
  }
);

export const getBlog = createAsyncThunk("blogs/getBlog", async (id) => {
  const res = await BlogServices.getById(id);
  return res.data;
});

export const removeBlog = createAsyncThunk("blogs/removeBlog", async (id) => {
  const res = await BlogServices.remove(id);
  return res.data;
});

// export const updateBlog = createAsyncThunk(
//   "blogs/updateBlog",
//   async ({ id, blog }) => {
//     const res = await BlogServices.update(id, blog);
//     return res.data;
//   }
// );

export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async ({ id, blog }) => {
    const res = await BlogServices.update(id, blog);
    return res?.data;
  }
);

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setCurrentPage: (state, { payload }) => {
      state.currentPage = payload;
    },
    setLimit: (state, { payload }) => {
      state.currentPage = 1;
      state.limit = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload.data.total;
        state.blogs = action.payload.data.data;
        state.error = "";
        state.success = "";
      })
      .addCase(listBlogs.pending, (state) => {
        state.loading = true;
      })
      .addCase(listBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload.data;
      })
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(getBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload.data;
      })
      .addCase(getBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.success = "";
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload.data;
        state.success = action.payload.data;
        state.error = "";
      })
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
      })

      .addCase(removeBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(removeBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload.data;
      })
      .addCase(removeBlog.pending, (state) => {
        state.loading = true;
      })
      .addCase(changeStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(changeStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload.data;
      })
      .addCase(changeStatus.pending, (state) => {
        state.loading = true;
      });
  },
});
export const { setCurrentPage } = blogSlice.actions;
export const blogReducer = blogSlice.reducer;
