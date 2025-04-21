import React from "react";
import {
    Box,
    Typography,
    Grid,
    Card,
    CardContent,
    Chip,
    Button,
    Container,
    Stack,
} from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LaunchIcon from "@mui/icons-material/Launch";

const features = [
    "Custom Hooks",
    "Lazy Loading",
    "useMemo & useCallback",
    "React.memo / PureComponent",
    "React Window (Virtualization)",
    "Redux & Persist",
    "useContext",
    "Error Boundaries",
    "Debounce / Throttle",
    "IntersectionObserver",
];

export default function Home() {
    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Typography variant="h3" fontWeight="bold" gutterBottom>
                React Advanced Sandbox
            </Typography>

            <Typography variant="h6" color="text.secondary" gutterBottom>
                A learning & reference playground showcasing advanced React concepts for
                modern web development. Optimized, scalable, and developer-friendly.
            </Typography>

            <Stack direction="row" spacing={2} my={3}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<GitHubIcon />}
                    href="https://github.com/Raj0168/react-advanced-sandbox"
                    target="_blank"
                >
                    View GitHub Repo
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<LaunchIcon />}
                    href="https://raj0168.github.io/react-advanced-sandbox/"
                    target="_blank"
                >
                    Live Preview
                </Button>
            </Stack>

            <Typography variant="h5" fontWeight="medium" mt={6} mb={2}>
                What's Inside?
            </Typography>

            <Grid container spacing={2}>
                {features.map((feature, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card variant="outlined" sx={{ height: "100%" }}>
                            <CardContent>
                                <Chip
                                    label={`#${index + 1}`}
                                    size="small"
                                    color="primary"
                                    sx={{ mb: 1 }}
                                />
                                <Typography variant="subtitle1" fontWeight="bold">
                                    {feature}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Box mt={8}>
                <Typography variant="body2" color="text.secondary" align="center">
                    📚 This project is open-source and created to help developers explore
                    and master advanced React patterns. Contributions welcome!
                </Typography>
            </Box>
        </Container>
    );
}
