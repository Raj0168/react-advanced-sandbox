import React, { useState } from "react";
import { AppBar, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import ExploreMenu from "./Header/ExploreMenu";
import UserMenu from "./Header/UserMenu";
import LogoTitle from "./Header/LogoTitle";
import LoginModal from "./LoginModal";

const Header = () => {
    const [showLogin, setShowLogin] = useState(false);

    return (
        <AppBar position="sticky">
            <Toolbar>
                <LogoTitle />

                <ExploreMenu />

                {/* <Button color="inherit">
                    <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
                        About
                    </Link>
                </Button> */}

                <UserMenu onLoginClick={() => setShowLogin(true)} />
            </Toolbar>
            <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
        </AppBar>
    );
};

export default Header;
