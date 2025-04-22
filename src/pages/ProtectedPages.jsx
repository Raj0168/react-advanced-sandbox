import React from "react";
import {
    Box,
    Typography,
    Paper,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Container,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";

const hocPages = [
    { page: "ProtectedUserDetails", route: "/user-details" },
];

const outletPages = [
    { page: "MeowPage", route: "/meow-page" },
    { page: "FloorMapPage", route: "/floor-map" },
];

const ProtectedPages = () => {
    const navigate = useNavigate();

    const renderPageList = (pages) => (
        <List dense>
            {pages.map((item, index) => (
                <ListItemButton key={index} onClick={() => navigate(item.route)}>
                    <ListItemIcon>
                        <LockIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                        primary={item.page}
                        secondary={`Route: ${item.route}`}
                    />
                </ListItemButton>
            ))}
        </List>
    );

    return (
        <Container>
            <Box sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Protected Pages Overview
                </Typography>
                <Typography variant="body2" sx={{ mb: 3 }}>
                    These are the protected pages in our web app using either HOC or React Router’s Outlet.
                    <br />
                    <strong>HOC (`withAuthProtection`)</strong>: Best for individual pages.
                    <br />
                    <strong>Outlet + ProtectedLayout</strong>: Best for grouped route protection.
                </Typography>

                <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        HOC-Protected Pages
                    </Typography>
                    {renderPageList(hocPages)}
                </Paper>

                <Paper elevation={3} sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                        Outlet-Protected Pages
                    </Typography>
                    {renderPageList(outletPages)}
                </Paper>
            </Box>
        </Container>
    );
};

export default ProtectedPages;
