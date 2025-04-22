import React from 'react';
import { Box, Container, Skeleton, Stack, Typography, Grid, Card, CardContent } from '@mui/material';

const ProfessionalSkeletonFallback = () => (
    <Box sx={{ position: 'relative', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {/* Main Content Area */}
        <Container maxWidth="lg" sx={{ py: 6 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {/* Title and Header Skeleton */}
                <Skeleton variant="rectangular" width="60%" height={40} sx={{ mb: 3, borderRadius: 2 }} />

                {/* Button Skeletons */}
                <Stack direction="row" spacing={2} my={3} justifyContent="center">
                    <Skeleton variant="rectangular" width={150} height={40} sx={{ borderRadius: 2 }} />
                    <Skeleton variant="rectangular" width={150} height={40} sx={{ borderRadius: 2 }} />
                </Stack>

                {/* Content Grid Skeleton */}
                <Grid container spacing={2}>
                    {[...Array(6)].map((_, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Card variant="outlined" sx={{ height: '100%', borderRadius: 2 }}>
                                <CardContent>
                                    {/* Avatar Skeleton */}
                                    <Skeleton variant="circle" width={40} height={40} sx={{ mb: 2 }} />
                                    {/* Text Skeletons */}
                                    <Skeleton variant="text" width="80%" sx={{ mb: 1 }} />
                                    <Skeleton variant="text" width="60%" sx={{ mb: 1 }} />
                                    <Skeleton variant="text" width="90%" />
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Footer or Info Skeleton */}
                <Box mt={8}>
                    <Typography variant="body2" color="text.secondary" align="center">
                        <Skeleton variant="text" width="50%" />
                    </Typography>
                </Box>
            </Box>
        </Container>

        {/* Background Animation */}
        <Box
            sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                zIndex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Skeleton variant="rectangular" width="80%" height="100%" sx={{ borderRadius: 2 }} />
        </Box>
    </Box>
);

export default ProfessionalSkeletonFallback;
