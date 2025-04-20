import React from "react";
import { Button, Typography } from "@mui/material";
import { useSnackbar } from "../hooks/useSnackbar";
import { useDispatch } from "react-redux";
import { showReduxSnackbar } from "../store/slices/snackbarSlice";

const Home = () => {
    const dispatch = useDispatch();
    const { showSnackbar } = useSnackbar();

    const handleClick = () => {
        showSnackbar("usecontext snackbar!", "success");
    };

    const dispatchSnackbar = () => {       
        dispatch(showReduxSnackbar({ message: "redux snackbar", severity: "info" }));
    }

    return (
        <>
            <Typography variant="h4" sx={{ my: 4, textAlign: "center" }}>
                Welcome to this helper React template!
            </Typography>

            <Button variant="outlined" sx={{ mx: 2 }} onClick={handleClick}>Trigger Snackbar</Button>
            <Button variant="outlined" onClick={dispatchSnackbar}>Trigger Redux</Button>
        </>
    )
}

export default Home;