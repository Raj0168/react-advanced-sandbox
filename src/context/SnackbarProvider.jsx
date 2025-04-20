import React, { useState, useCallback } from "react";
import { SnackbarContext } from "./SnackbarContext";
import SnackbarUtil from "../utils/SnackbarUtil";

const SnackBarProvider = ({ children }) => {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: "",
        severity: "info",
    });

    const showSnackbar = useCallback((message, severity = "info") => {
        setSnackbar({ open: true, message, severity });
    }, []);

    const hideSnackbar = useCallback(() => {
        setSnackbar((prev) => ({ ...prev, open: false }));
    }, []);

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {children}
            <SnackbarUtil
                open={snackbar.open}
                message={snackbar.message}
                severity={snackbar.severity}
                onClose={hideSnackbar}
            />
        </SnackbarContext.Provider>
    );
};

export default SnackBarProvider;
