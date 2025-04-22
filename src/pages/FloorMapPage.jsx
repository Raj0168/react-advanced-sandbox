import React, { useState } from "react";
import FloorMap from "../components/FloorMap/FloorMap";
import FloorSelector from "../components/FloorMap/FloorSelector";
import { Box, Container, Divider, Typography } from "@mui/material";

const floors = [
    { id: "floor1", label: "Floor 1", file: "/floor1.svg" },
    { id: "floor2", label: "Floor 2", file: "/floor2.svg" },
];

const FloorMapPage = () => {
    const [selectedFloor, setSelectedFloor] = useState("floor1");

    return (
        <>
            <Container sx={{ py: 5, display: 'flex', justifyContent: 'center', flexDirection: "column", alignItems: 'center' }}>
                <Typography variant="h4">Interactive Floor Map</Typography>

                <Typography variant="body1" color="text.secondary" my={3}>
                    This page showcases an interactive floor map built using SVG images for visual structure and
                    the <code>react-zoom-pan-pinch</code> library to enable zoom and pan functionalities. The
                    component dynamically switches between different floors using a selector above.
                    <br />
                    <br />
                    <strong>Why SVG?</strong> SVGs are scalable and resolution-independent, making them perfect
                    for precise floor layouts, room boundaries, and interactive elements like text, icons, or
                    color-coded statuses.
                    <br />
                </Typography>

                <Divider sx={{ my: 3, width: "100%" }} />

                <FloorSelector
                    floors={floors}
                    selected={selectedFloor}
                    onChange={setSelectedFloor}
                />
                <FloorMap selectedFloor={selectedFloor} />

                <Typography>
                    <br />
                    <strong>How it works:</strong> On selecting a floor, the corresponding SVG is rendered
                    inside a zoomable and pannable container, allowing users to interact with the image just
                    like a map. Each room can include data such as fire detection systems, seat availability,
                    or access control indicators.
                    <br />
                </Typography>
            </Container >
        </>
    )
}

export default FloorMapPage;