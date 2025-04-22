import React, { useState } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { Link } from "react-router-dom";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const ExploreMenu = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [isHovering, setIsHovering] = useState(false);

    const handleEnter = (e) => {
        setAnchorEl(e.currentTarget);
        setIsHovering(true);
    };

    const handleLeave = () => {
        setIsHovering(false);
        setTimeout(() => {
            if (!isHovering) setAnchorEl(null);
        }, 150);
    };

    const isOpen = Boolean(anchorEl);

    return (
        <>
            <Button
                color="inherit"
                onMouseEnter={handleEnter}
                onMouseLeave={handleLeave}
            >
                Explore {isOpen ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
            </Button>

            <Menu
                anchorEl={anchorEl}
                open={isOpen}
                onClose={() => setAnchorEl(null)}
                slotProps={{
                    list: {
                        onMouseEnter: () => setIsHovering(true),
                        onMouseLeave: handleLeave,
                    },
                    paper: {
                        sx: { minWidth: 200, borderRadius: 2 },
                    },
                }}
            >
                {[
                    { label: "Lazy Component", to: "/pages/lazy" },
                    { label: "Fetch Component", to: "/pages/fetch" },
                    { label: "R & M", to: "/rick-and-morty" },
                    { label: "Search Page", to: "/search" },
                    { label: "Protected Pages", to: "/protected" },
                ].map((item) => (
                    <MenuItem key={item.to} onClick={() => setAnchorEl(null)}>
                        <Link to={item.to} style={{ textDecoration: "none", color: "inherit", width: "100%" }}>
                            {item.label}
                        </Link>
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default ExploreMenu;
