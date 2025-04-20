import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchPosts = createAsyncThunk("api/fetchPosts", async (page) => {
  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`
  );
  return res.data;
});

const apiSlice = createSlice({
  name: "api",
  initialState: {
    posts: [],
    status: "idle",
    page: 1,
  },

  reducers: {
    incrementPage(state) {
      state.page += 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "success";
        state.posts = [...state.posts, ...action.payload];
      });
  },
});

export const { incrementPage } = apiSlice.actions;
export default apiSlice.reducer;
