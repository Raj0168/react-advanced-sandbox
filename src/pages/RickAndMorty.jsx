import React, { useEffect, useState, useMemo, useCallback } from "react";
import usePaginationFetch from "../hooks/usePaginationFetch";
import {
    Box,
    Button,
    Container,
    Grid,
    Pagination,
    Tab,
    Tabs,
    Typography,
    Paper,
    Stack,
    Divider,
    Tooltip,
} from "@mui/material";
import CharacterCard from "../components/RaM/CharacterCard";
import LocationCard from "../components/RaM/LocationCard";
import DetailModal from "../components/RaM/DetailModal";
import InfiniteGrid from "../components/RaM/InfiniteGrid";
import SkeletonFallback from "../utils/SkeletonFallback";

const BASE_URL = "https://rickandmortyapi.com/api/";

export default function RickAndMorty() {
    const [tab, setTab] = useState("character");
    const [page, setPage] = useState(1);
    const [isInfiniteScroll, setIsInfiniteScroll] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [modalUrl, setModalUrl] = useState("");

    const { data: items, loading, error, paginationInfo } = usePaginationFetch(
        `${BASE_URL}${tab}`,
        page,
        isInfiniteScroll
    );

    useEffect(() => {
        if (selectedItemId !== null) {
            setModalUrl(`${BASE_URL}${tab}/${selectedItemId}`);
        }
    }, [selectedItemId, tab]);

    const handleTabChange = (e, newValue) => {
        setTab(newValue);
        setPage(1);
    };

    const handleToggleMode = () => {
        setIsInfiniteScroll((p) => !p);
        setPage(1);
    };

    const handleCardClick = (id) => {
        setSelectedItemId(id);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedItemId(null);
    };

    const isItemLoaded = (index) => index < items.length;

    const loadMoreItems = () => {
        if (!loading && paginationInfo?.next) {
            setPage((p) => p + 1);
        }
        return Promise.resolve();
    };

    const totalCount = paginationInfo?.count || 0;

    const memoizedItems = useMemo(() => items, [items]);

    const onCardClickMemo = useCallback((id) => handleCardClick(id), []);

    return (
        <Container>
            <Box sx={{ mt: 3 }}>
                <Typography variant="h4" gutterBottom align="center">
                    Rick and Morty Explorer
                </Typography>

                <Paper sx={{ p: 3, mb: 3, backgroundColor: "#f5f5f5" }}>
                    <Typography variant="h6" gutterBottom>
                        Advanced React Concepts
                    </Typography>
                    <Stack spacing={1}>
                        <Typography>
                            This page leverages several advanced React concepts:
                        </Typography>
                        <ul>
                            <li>
                                <strong>React.memo</strong>: Memoizes the `CharacterCard`
                                and `LocationCard` components to avoid unnecessary re-renders.
                            </li>
                            <li>
                                <strong>useMemo</strong>: Used to memoize the `items` array for
                                performance optimization when the data is unchanged.
                            </li>
                            <li>
                                <strong>useCallback</strong>: Memoizes the `onCardClickMemo`
                                function to prevent unnecessary re-creations of the function
                                during re-renders.
                            </li>
                            <li>
                                <strong>React-Window</strong>: Efficiently renders large lists by
                                rendering only the visible items in the grid, thus improving
                                performance for large data sets.
                            </li>
                            <li>
                                <strong>Skeleton Fallback</strong>: Displays a skeleton screen
                                while the content is loading, ensuring smooth user experience.
                            </li>
                            <li>
                                <strong>Infinite Scroll</strong>: Implemented using
                                `react-window-infinite-loader` to fetch new data as the user
                                scrolls, reducing the number of requests needed to load a large
                                dataset.
                            </li>
                            <li>
                                <strong>Rick and Morty API</strong>: We use the free{' '}
                                <a href="https://rickandmortyapi.com/" target="_blank" rel="noopener noreferrer">
                                    Rick and Morty API
                                </a>{' '}
                                because it provides a large dataset for testing these advanced
                                React concepts in a realistic scenario.
                            </li>
                        </ul>
                    </Stack>
                </Paper>

                <Tabs
                    value={tab}
                    onChange={handleTabChange}
                    textColor="primary"
                    indicatorColor="primary"
                    sx={{ mb: 2 }}
                >
                    <Tab value="character" label="Characters" />
                    <Tab value="location" label="Locations" />
                </Tabs>

                <Button
                    variant="outlined"
                    onClick={handleToggleMode}
                    sx={{ mb: 2 }}
                    fullWidth
                >
                    Switch to {isInfiniteScroll ? "Pagination" : "Infinite Scroll"}
                </Button>

                {isInfiniteScroll ? (
                    <Box sx={{ mt: 3, width: "100%", height: "70vh" }}>
                        <InfiniteGrid
                            items={memoizedItems}
                            totalCount={totalCount}
                            tab={tab}
                            onCardClick={onCardClickMemo}
                            loadMoreItems={loadMoreItems}
                            isItemLoaded={isItemLoaded}
                        />
                    </Box>
                ) : (
                    <>
                        <Grid container spacing={2}>
                            {memoizedItems.map((item) => (
                                <Grid item xs={12} sm={6} md={4} key={item.id}>
                                    {tab === "character" ? (
                                        <CharacterCard
                                            character={item}
                                            onClick={onCardClickMemo}
                                        />
                                    ) : (
                                        <LocationCard
                                            location={item}
                                            onClick={onCardClickMemo}
                                        />
                                    )}
                                </Grid>
                            ))}
                        </Grid>

                        <Box mt={3} display="flex" justifyContent="center">
                            <Pagination
                                count={paginationInfo?.pages || 1}
                                page={page}
                                onChange={(_, v) => setPage(v)}
                                color="primary"
                            />
                        </Box>
                    </>
                )}

                {showModal && (
                    <DetailModal
                        open={showModal}
                        onClose={handleModalClose}
                        url={modalUrl}
                        type={tab}
                    />
                )}

                {loading && <SkeletonFallback />}
                {error && (
                    <Typography color="error" mt={2}>
                        {error.message || "Something went wrong"}
                    </Typography>
                )}
            </Box>
        </Container>
    );
}
