import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";

const UserDetails = () => {
    const { username, profession } = useSelector((state) => state.user);

    return (
        <Box mt={5} textAlign="center">
            <Typography variant="h4">👤 User Details</Typography>
            <Typography variant="h6" mt={2}>Username: {username}</Typography>
            <Typography variant="h6">Profession: {profession}</Typography>
        </Box>
    );
};

export default UserDetails;
