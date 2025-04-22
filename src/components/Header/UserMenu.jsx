import React, { useState } from "react";
import { Menu, MenuItem, IconButton, Avatar } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/userSlice";
import { AccountCircle } from "@mui/icons-material";
import { showReduxSnackbar } from "../../store/slices/snackbarSlice";

const UserMenu = ({ onLoginClick }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const user = useSelector((state) => state.user.username);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (e) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const handleLogout = () => {
        dispatch(logout());
        handleClose();
        dispatch(showReduxSnackbar({ message: "Successfully logged out", severity: "info" }));
        navigate("/");
    };

    return (
        <>
            <IconButton onClick={handleClick} color="inherit">
                <Avatar>
                    {user?.trim() ? user.trim()[0].toUpperCase() : <AccountCircle />}
                </Avatar>
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                slotProps={{ paper: { sx: { minWidth: 200, borderRadius: 2 } } }}
            >
                <MenuItem onClick={handleClose}>
                    <Link to="/user-details" style={{ textDecoration: "none", color: "inherit", width: "100%" }}>
                        Profile
                    </Link>
                </MenuItem>
                {user ? (
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                ) : (
                    <MenuItem onClick={() => { onLoginClick(); handleClose(); }}>Login</MenuItem>
                )}
            </Menu>
        </>
    );
};

export default UserMenu;
