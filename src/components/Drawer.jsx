import { ListItemButton } from "@mui/material";
import React from "react";

export default function Drawer() {
    return (
        <Box
            sx={{
                width: 250,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: 2,
                backgroundColor: theme.palette.background.paper,
            }}
        >
            <Typography
                variant="h5"
                sx={{
                    fontWeight: "bold",
                    marginBottom: 2,
                    color: theme.palette.primary.main,
                    textAlign: "center",
                }}
            >
                Helper
            </Typography>

            <Divider sx={{ width: "100%", marginBottom: 2 }} />

            <List sx={{ width: "100%" }}>

                <>
                    <Link to="/redux" >
                        <ListItemButton
                            component="a"
                            onClick={toggleDrawer(false)}
                            sx={{ padding: "8px 16px" }}
                        >
                            <ListItemText
                                primary="Redux"
                                sx={{ fontWeight: "bold", fontSize: "16px" }}
                            />
                        </ListItemButton>
                    </Link>

                    <Link to="/more" >
                        <ListItemButton
                            component="a"
                            onClick={toggleDrawer(false)}
                            sx={{ padding: "8px 16px" }}
                        >
                            <ListItemText
                                primary="More"
                                sx={{ fontWeight: "bold", fontSize: "16px" }}
                            />
                        </ListItemButton>
                    </Link>
                </>

                <Link to="/info/about-us" >
                    <ListItemButton
                        component="a"
                        onClick={toggleDrawer(false)}
                        sx={{ padding: "8px 16px" }}
                    >
                        <ListItemText
                            primary="About Us"
                            sx={{ fontWeight: "bold", fontSize: "16px" }}
                        />
                    </ListItemButton>
                </Link>

                <Link to="/info/contact-us" >
                    <ListItemButton
                        component="a"
                        onClick={toggleDrawer(false)}
                        sx={{ padding: "8px 16px" }}
                    >
                        <ListItemText
                            primary="Reach Out to Us"
                            sx={{ fontWeight: "bold", fontSize: "16px" }}
                        />
                    </ListItemButton>
                </Link>

                <Link to="/info/privacy-policy" >
                    <ListItemButton
                        component="a"
                        onClick={toggleDrawer(false)}
                        sx={{ padding: "8px 16px" }}
                    >
                        <ListItemText
                            primary="Privacy Policy"
                            sx={{ fontWeight: "bold", fontSize: "16px" }}
                        />
                    </ListItemButton>
                </Link>

                <Link to="/info/terms-of-service" >
                    <ListItemButton
                        component="a"
                        onClick={toggleDrawer(false)}
                        sx={{ padding: "8px 16px" }}
                    >
                        <ListItemText
                            primary="Terms of Services"
                            sx={{ fontWeight: "bold", fontSize: "16px" }}
                        />
                    </ListItemButton>
                </Link>
            </List>
        </Box>
    );
}