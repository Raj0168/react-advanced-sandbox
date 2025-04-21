import { Box } from "@mui/material";
import AutoSizer from "react-virtualized-auto-sizer";
import { FixedSizeGrid, FixedSizeList } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import CharacterCard from "./CharacterCard";
import LocationCard from "./LocationCard";
import Loader from "../Loader";

const CARD_WIDTH = 280;
const CARD_HEIGHT = 340;
const LIST_ITEM_HEIGHT = 80;

export default function InfiniteGrid({
    items,
    tab,
    onCardClick,
    loadMoreItems,
    isItemLoaded,
}) {
    const isCharacter = tab === "character";

    return (
        <Box sx={{ height: "100%", width: "100%" }}>
            <InfiniteLoader
                isItemLoaded={isItemLoaded}
                itemCount={items.length + 1}
                loadMoreItems={loadMoreItems}
            >
                {({ onItemsRendered, ref }) => (
                    <AutoSizer>
                        {({ height, width }) => {
                            if (isCharacter) {
                                const columnCount = Math.max(1, Math.floor(width / CARD_WIDTH));
                                const rowCount = Math.ceil((items.length + 1) / columnCount);

                                return (
                                    <FixedSizeGrid
                                        ref={ref}
                                        columnCount={columnCount}
                                        columnWidth={CARD_WIDTH}
                                        height={height}
                                        rowCount={rowCount}
                                        rowHeight={CARD_HEIGHT}
                                        width={width}
                                        onItemsRendered={({ overscanRowStartIndex, overscanRowStopIndex }) => {
                                            const startIndex = overscanRowStartIndex * columnCount;
                                            const stopIndex = overscanRowStopIndex * columnCount;
                                            onItemsRendered({
                                                overscanStartIndex: startIndex,
                                                overscanStopIndex: stopIndex,
                                                visibleStartIndex: startIndex,
                                                visibleStopIndex: stopIndex,
                                            });
                                        }}
                                    >
                                        {({ columnIndex, rowIndex, style }) => {
                                            const idx = rowIndex * columnCount + columnIndex;
                                            const item = items[idx];
                                            return (
                                                <div style={{ ...style, padding: 8 }} onClick={() => item && onCardClick(item.id)}>
                                                    {item ? <CharacterCard character={item} /> : <Loader />}
                                                </div>
                                            );
                                        }}
                                    </FixedSizeGrid>
                                );
                            }

                            // location list style
                            return (
                                <FixedSizeList
                                    ref={ref}
                                    height={height}
                                    itemCount={items.length + 1}
                                    itemSize={LIST_ITEM_HEIGHT}
                                    width={width}
                                    onItemsRendered={onItemsRendered}
                                >
                                    {({ index, style }) => {
                                        const item = items[index];
                                        return (
                                            <div style={style} onClick={() => item && onCardClick(item.id)}>
                                                {item ? <LocationCard location={item} /> : <Loader />}
                                            </div>
                                        );
                                    }}
                                </FixedSizeList>
                            );
                        }}
                    </AutoSizer>
                )}
            </InfiniteLoader>
        </Box>
    );
}
