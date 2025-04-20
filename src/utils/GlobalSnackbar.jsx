import React from "react";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux"
import { hideReduxSnackbar } from "../store/slices/snackbarSlice";

const GlobalSnackbar = () => {
    const dispatch = useDispatch();
    const { open, message, severity } = useSelector((state) => state.snackbar);

    return (
        <Snackbar
            open={open} autoHideDuration={3000} onClose={() => dispatch(hideReduxSnackbar())}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}>
            <Alert
                onClose={() => dispatch(hideReduxSnackbar())} severity={severity}
                sx={{ width: "100%" }}>{message}</Alert>
        </Snackbar>
    )
}

export default GlobalSnackbar;