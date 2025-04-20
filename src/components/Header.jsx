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
    const [exploreAnchorEl, setExploreAnchorEl] = useState(null);
    const [isHoveringExplore, setIsHoveringExplore] = useState(false);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const handleExploreEnter = (event) => {
        setExploreAnchorEl(event.currentTarget);
        setIsHoveringExplore(true);
    };

    const handleExploreLeave = () => {
        setIsHoveringExplore(false);
        setTimeout(() => {
            if (!isHoveringExplore) {
                setExploreAnchorEl(null);
            }
        }, 150);
    };

    const handleMenuEnter = () => {
        setIsHoveringExplore(true);
    };

    const handleMenuLeave = () => {
        setIsHoveringExplore(false);
        setTimeout(() => {
            if (!isHoveringExplore) {
                setExploreAnchorEl(null);
            }
        }, 150);
    };

    const isExploreMenuOpen = Boolean(exploreAnchorEl);

    return (
        <AppBar position="sticky">
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

                <Button
                    color="inherit"
                    onMouseEnter={handleExploreEnter}
                    onMouseLeave={handleExploreLeave}
                >
                    Explore {isExploreMenuOpen ? '▲' : '▼'}
                </Button>

                <Menu
                    anchorEl={exploreAnchorEl}
                    open={isExploreMenuOpen}
                    onClose={() => setExploreAnchorEl(null)}
                    slotProps={{
                        list: {
                            onMouseEnter: handleMenuEnter,
                            onMouseLeave: handleMenuLeave,
                        },
                        paper: {
                            sx: {
                                minWidth: 200,
                                borderRadius: 2,
                            },
                        },
                    }}
                >
                    <MenuItem onClick={() => setExploreAnchorEl(null)}>
                        <Link
                            to="/lazy"
                            style={{ textDecoration: "none", color: "inherit", width: "100%" }}
                        >
                            Lazy Component
                        </Link>
                    </MenuItem>
                    <MenuItem onClick={() => setExploreAnchorEl(null)}>
                        <Link
                            to="/fetch"
                            style={{ textDecoration: "none", color: "inherit", width: "100%" }}
                        >
                            Fetch Component
                        </Link>
                    </MenuItem>
                </Menu>

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
                    slotProps={{
                        paper: {
                            sx: {
                                minWidth: 200,
                                borderRadius: 2,
                            },
                        },
                    }}
                >
                    <MenuItem onClick={handleCloseMenu}>
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
                    <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
