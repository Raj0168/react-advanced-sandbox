import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  profession: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.username = action.payload.username;
      state.profession = action.payload.profession;
    },
    logout: (state) => {
      state.username = null;
      state.profession = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
