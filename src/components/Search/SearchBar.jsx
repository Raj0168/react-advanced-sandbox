import React from "react";
import {
    Box,
    Button,
    TextField,
    IconButton,
    InputAdornment,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import SearchIcon from "@mui/icons-material/Search";

const SearchBar = ({ query, onInputChange, onSearch }) => {
    const handleClear = () => {
        onInputChange({ target: { value: "" } });
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter" && query.trim()) {
            onSearch();
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                width: "100%",
                gap: 2,
            }}
        >
            <TextField
                label="Search"
                variant="outlined"
                fullWidth
                value={query}
                onChange={onInputChange}
                onKeyDown={handleKeyDown}
                InputProps={{
                    endAdornment: query && (
                        <InputAdornment position="end">
                            <IconButton onClick={handleClear} edge="end">
                                <ClearIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                sx={{ borderRadius: 2 }}
            />

            <Button
                variant="contained"
                color="primary"
                startIcon={<SearchIcon />}
                disabled={!query.trim()}
                onClick={onSearch}
                sx={{
                    minWidth: { xs: "100%", sm: "120px" },
                    whiteSpace: "nowrap",
                    px: 3,
                    py: 1.5,
                }}
            >
                Search
            </Button>
        </Box>
    );
};

export default SearchBar;
