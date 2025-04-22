import React from "react";
import {
    Box,
    Typography,
    Link,
    Card,
    CardContent,
    CardMedia,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Skeleton,
} from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import SearchResultsSkeleton from "./SearchResultsSkeleton";

const SearchResults = ({ results, loading }) => {
    const relatedItems = [];

    results.forEach((result) => {
        if (result.Text && result.FirstURL) {
            relatedItems.push(result);
        } else if (result.Topics) {
            relatedItems.push(...result.Topics);
        }
    });

    return (
        <Box>
            {loading ? (
                <SearchResultsSkeleton />

            ) : (
                relatedItems.length > 0 && (
                    <>
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="h6" gutterBottom>
                            Related Results
                        </Typography>
                        <List dense>
                            {relatedItems.map((item, index) => (
                                <ListItem
                                    key={index}
                                    component="a"
                                    href={item.FirstURL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{
                                        borderRadius: 1,
                                        mb: 1,
                                        "&:hover": { backgroundColor: "action.hover" },
                                    }}
                                >
                                    <ListItemIcon>
                                        <LaunchIcon fontSize="small" />
                                    </ListItemIcon>
                                    <ListItemText primary={item.Text} />
                                </ListItem>
                            ))}
                        </List>
                    </>
                )
            )}
        </Box>
    );
};

export default SearchResults;
