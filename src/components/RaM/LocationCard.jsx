import React from "react";
import {
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    Divider,
} from "@mui/material";

const LocationCard = React.memo(({ location, onClick }) => (
    <>
        <ListItem disablePadding>
            <ListItemButton onClick={onClick}>
                <ListItemText
                    primary={location?.name}
                    secondary={`${location?.type} - ${location?.dimension}`}
                    primaryTypographyProps={{ variant: "subtitle1" }}
                    secondaryTypographyProps={{ variant: "body2", color: "text.secondary" }}
                />
            </ListItemButton>
        </ListItem>
        <Divider />
    </>
));

export default LocationCard;
