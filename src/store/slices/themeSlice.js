import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    darkMode: false,
    fontSize: 14,
  },

  reducers: {
    toggleDarkMode(state) {
      state.darkMode = !state.darkMode;
    },
    increaseFontSize(state) {
      state.fontSize = Math.min(24, state.fontSize - 2);
    },
    decreaseFontSize(state) {
      state.fontSize = Math.max(8, state.fontSize - 2);
    },
    resetFontSize(state) {
      state.fontSize = 14;
    },
  },
});

export const {
  toggleDarkMode,
  increaseFontSize,
  decreaseFontSize,
  resetFontSize,
} = themeSlice.actions;
export default themeSlice.reducer;
