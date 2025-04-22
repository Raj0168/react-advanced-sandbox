import React from "react";
import {
    Box,
    Typography,
    Skeleton,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";

const SearchResultsSkeleton = () => {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Related Results
            </Typography>
            <List dense>
                {[...Array(5)].map((_, index) => (
                    <ListItem key={index}>
                        <ListItemIcon>
                            <Skeleton variant="circular" width={24} height={24} />
                        </ListItemIcon>
                        <ListItemText>
                            <Skeleton variant="text" width="80%" />
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
        </Box>
    );
};

export default SearchResultsSkeleton;
