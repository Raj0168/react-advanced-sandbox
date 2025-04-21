import React, { useEffect, useState } from "react";
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
} from "@mui/material";
import Loader from "../components/Loader";
import CharacterCard from "../components/RaM/CharacterCard";
import LocationCard from "../components/RaM/LocationCard";
import DetailModal from "../components/RaM/DetailModal";

import InfiniteGrid from "../components/RaM/InfiniteGrid";

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

    return (
        <Container>
            <Box sx={{ mt: 3 }}>
                <Typography variant="h4" gutterBottom fu>
                    Rick and Morty Explorer
                </Typography>

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
                >
                    Switch to {isInfiniteScroll ? "Pagination" : "Infinite Scroll"}
                </Button>

                {isInfiniteScroll ? (
                    <Box sx={{ mt: 3, width: "100%", height: "70vh" }}>
                        <InfiniteGrid
                            items={items}
                            totalCount={totalCount}
                            tab={tab}
                            onCardClick={handleCardClick}
                            loadMoreItems={loadMoreItems}
                            isItemLoaded={isItemLoaded}
                        />
                    </Box>

                ) : (
                    <>
                        <Grid container spacing={2}>
                            {items.map((item) => (
                                <Grid item xs={12} sm={6} md={4} key={item.id}>
                                    {tab === "character" ? (
                                        <CharacterCard
                                            character={item}
                                            onClick={() => handleCardClick(item.id)}
                                        />
                                    ) : (
                                        <LocationCard
                                            location={item}
                                            onClick={() => handleCardClick(item.id)}
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

                {loading && <Loader />}
                {error && (
                    <Typography color="error" mt={2}>
                        {error.message || "Something went wrong"}
                    </Typography>
                )}
            </Box>
        </Container>
    );
}
