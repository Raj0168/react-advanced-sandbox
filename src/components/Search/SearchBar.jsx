import React from "react";
import { Box, Button, TextField } from "@mui/material";

const SearchBar = ({ query, onInputChange, onSearch }) => {
    return (
        <Box sx={{ display: "flex", width: "100%", gap: 2 }}>
            <TextField
                label="Search"
                variant="outlined"
                fullWidth
                value={query}
                onChange={onInputChange}
            />
            <Button
                variant="contained"
                color="primary"
                disabled={query.length < 1}
                onClick={onSearch}
            >
                Search
            </Button>
        </Box>
    );
};

export default SearchBar;
