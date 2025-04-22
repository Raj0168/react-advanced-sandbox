import React from 'react';
import { Box, Skeleton } from '@mui/material';

const SkeletonFallback = () => (
    <Box sx={{ p: 2 }}>
        <Skeleton variant="text" height={40} width="60%" />
        <Skeleton variant="rectangular" height={300} sx={{ my: 2 }} />
        <Skeleton variant="text" height={40} width="80%" />
    </Box>
);

export default SkeletonFallback;
