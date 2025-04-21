import React from "react";
import {
    List,
    ListItem,
    ListItemButton,
    ListItemText,
    Divider,
    Box,
} from "@mui/material";
import InfiniteLoader from "react-window-infinite-loader";
import { FixedSizeList as VirtualizedList } from "react-window";

const ROW_HEIGHT = 72;

export default function LocationList({
    locations,
    onItemClick,
    loadMoreItems,
    isItemLoaded,
}) {
    const itemCount = locations.length + 1;

    const Row = ({ index, style }) => {
        const location = locations[index];

        if (!location) {
            return <div style={style}>Loading...</div>;
        }

        return (
            <div style={style}>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => onItemClick(location.id)}>
                        <ListItemText
                            primary={location.name}
                            secondary={`${location.type} - ${location.dimension}`}
                        />
                    </ListItemButton>
                </ListItem>
                <Divider />
            </div>
        );
    };

    return (
        <Box sx={{ height: "100%", width: "100%" }}>
            <InfiniteLoader
                isItemLoaded={isItemLoaded}
                itemCount={itemCount}
                loadMoreItems={loadMoreItems}
            >
                {({ onItemsRendered, ref }) => (
                    <VirtualizedList
                        height={window.innerHeight * 0.7}
                        itemCount={itemCount}
                        itemSize={ROW_HEIGHT}
                        width="100%"
                        onItemsRendered={onItemsRendered}
                        ref={ref}
                    >
                        {Row}
                    </VirtualizedList>
                )}
            </InfiniteLoader>
        </Box>
    );
}
