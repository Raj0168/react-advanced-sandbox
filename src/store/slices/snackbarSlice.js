import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  open: false,
  message: "",
  severity: "info",
};

const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    showReduxSnackbar: (state, action) => {      
      state.open = true;
      state.message = action.payload.message;
      state.severity = action.payload.severity || "info";
    },
    hideReduxSnackbar: (state) => {
      state.open = false;
    },
  },
});

export const { showReduxSnackbar, hideReduxSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
