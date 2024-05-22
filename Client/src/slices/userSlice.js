// userSlice.js

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getById, List, updateUserDetails } from "../services/users";

const initialState = {
  users: [],
  user: {},
  page: 1,
  total: 0,
  limit: 20,
  loading: false,
  error: "",
  message: "",
};

export const listUsers = createAsyncThunk(
  "users/listUsers",
  async ({ limit, page, name, role }) => {
    try {
      const response = await List(limit, page, name, role);
      return response?.data?.data;
    } catch (error) {
      throw Error(error.message);
    }
  }
);
export const getSingleUser = createAsyncThunk(
  "users/getSingleUser",
  async ({ id }) => {
    try {
      const response = await getById({ _id: id });
      return response.data; // Assuming the response structure is { data: { total, data } }
    } catch (error) {
      throw Error(error.message);
    }
  }
);

export const updateUser = createAsyncThunk(
  "users/updateUser",
  async (payload) => {
    try {
      console.log("payload slice", payload);
      const response = await updateUserDetails(payload);
      return response?.data; // Assuming the response structure is { data: { total, data } }
    } catch (error) {
      throw Error(error.message);
    }
  }
);

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setPage: (state, { payload }) => {
      state.page = payload;
    },
    setLimit: (state, { payload }) => {
      state.page = 1;
      state.limit = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(listUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.total = action.payload.data.total;
        state.users = action.payload.data;
        state.error = "";
        state.message = "";
      })
      .addCase(listUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getSingleUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getSingleUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.message;
        state.error = "";
        state.message = "";
      })
      .addCase(getSingleUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message;
        state.error = "";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.message = "";
      });
  },
});

export const { setPage, setLimit } = userSlice.actions;
export const userReducer = userSlice.reducer;
