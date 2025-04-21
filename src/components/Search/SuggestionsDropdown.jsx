import React from "react";
import { List, ListItemButton, ListItemText, Paper } from "@mui/material";

const SuggestionsDropdown = ({ suggestions, onSuggestionClick }) => {
    if (!suggestions.length) return null;

    return (
        <Paper elevation={3} sx={{ mt: 1, width: "100%" }}>
            <List dense>
                {suggestions.map((suggestion, index) => (
                    <ListItemButton key={index} onClick={() => onSuggestionClick(suggestion)}>
                        <ListItemText primary={suggestion} />
                    </ListItemButton>
                ))}
            </List>
        </Paper>
    );
};

export default SuggestionsDropdown;
