import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    MenuItem,
    Button,
    Avatar,
} from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar position="sticky" sx={{ width: "100%" }}>
            <Toolbar>
                <Typography
                    variant="h6"
                    sx={{
                        flexGrow: 1,
                        textAlign: "left",
                        fontWeight: "bold",
                    }}
                >
                    <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                        Helper
                    </Link>
                </Typography>

                <Button color="inherit">
                    <Link to="/lazy" style={{ textDecoration: "none", color: "inherit" }}>
                        Explore
                    </Link>
                </Button>
                <Button color="inherit">
                    <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                        Waahoo
                    </Link>
                </Button>

                <IconButton onClick={handleMenuClick} color="inherit">
                    <Avatar>A</Avatar>
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseMenu}
                    PaperProps={{
                        sx: {
                            minWidth: 200,
                            borderRadius: 2,
                        },
                    }}
                >
                    <MenuItem
                        onClick={handleCloseMenu}
                        sx={{
                            padding: "8px 16px",
                            "&:hover": {
                                backgroundColor: "rgba(0, 0, 0, 0.08)",
                            },
                        }}
                    >
                        <Link
                            to="/"
                            style={{
                                textDecoration: "none",
                                color: "inherit",
                                width: "100%",
                            }}
                        >
                            Profile
                        </Link>
                    </MenuItem>
                    <MenuItem
                        onClick={() => {
                            handleCloseMenu();
                            handleLogout();
                        }}
                        sx={{
                            padding: "8px 16px",
                            "&:hover": {
                                backgroundColor: "rgba(0, 0, 0, 0.08)",
                            },
                        }}
                    >
                        Logout
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
