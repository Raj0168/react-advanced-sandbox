import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  history: [],
};

const searchHistorySlice = createSlice({
  name: "searchHistory",
  initialState,
  reducers: {
    addToSearchHistory: (state, action) => {
      state.history.push(action.payload);
    },

    clearSearchHistory: (state) => {
      state.history = [];
    },
  },
});

export const { addToSearchHistory, clearSearchHistory } =
  searchHistorySlice.actions;
export default searchHistorySlice.reducer;
