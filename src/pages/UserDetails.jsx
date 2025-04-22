import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Container, Paper, Grid, Card, CardContent } from "@mui/material";

const UserDetails = () => {
    const { username, profession } = useSelector((state) => state.user);

    return (
        <Container sx={{ py: 5 }}>
            <Paper sx={{ p: 3, mb: 3, backgroundColor: "#f5f5f5" }}>
                <Typography variant="h4" align="center" gutterBottom>
                    👤 User Details
                </Typography>

                {/* User Info Section */}
                <Card variant="outlined" sx={{ mb: 3 }}>
                    <CardContent>
                        <Typography variant="h6">Username:</Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            {username}
                        </Typography>
                        <Typography variant="h6">Profession:</Typography>
                        <Typography variant="body1">{profession}</Typography>
                    </CardContent>
                </Card>

                <Box sx={{ my: 3 }}>
                    <Typography variant="h6" sx={{ mb: 1 }} color="text.primary">
                        Redux Persist & Secure Storage
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        This component is utilizing <strong>redux-persist</strong> to keep user data (e.g., username, profession)
                        across sessions. The data is securely stored using <strong>redux-persist-transform-encrypt</strong>,
                        ensuring that sensitive information is encrypted with a secret key before it is stored in local storage.
                    </Typography>
                </Box>

                <Box sx={{ my: 3 }}>
                    <Typography variant="h6" sx={{ mb: 1 }} color="text.primary">
                        Authentication Protection
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        This component is protected by a <strong>Higher Order Component (HOC)</strong> called <code>withAuthProtection</code>.
                        The HOC ensures that only authenticated users can access the user details.
                        If the user is not logged in, they will be redirected to the login page ("/requires-login").
                    </Typography>
                </Box>
            </Paper>
        </Container>
    );
};

export default UserDetails;
