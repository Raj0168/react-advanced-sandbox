import React, { useState } from "react";
import {
    Box,
    Container,
    Typography,
    IconButton,
    Drawer,
    Divider,
    List,
    ListItem,
    ListItemText,
    Toolbar,
    AppBar,
    Paper,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import HistoryIcon from "@mui/icons-material/History";
import { useDispatch, useSelector } from "react-redux";
import {
    addToSearchHistory,
    clearSearchHistory,
} from "../store/slices/historySlice";
import fetchJsonp from "fetch-jsonp";
import SearchBar from "../components/Search/SearchBar";
import SearchResults from "../components/Search/SearchResults";
import SearchResultsSkeleton from "../components/Search/SearchResultsSkeleton";

const drawerWidth = 200;

const SearchPage = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const dispatch = useDispatch();
    const history = useSelector((state) => state.searchHistory.history);

    const fetchSearchResults = async (searchText) => {
        setLoading(true);
        try {
            const res = await fetchJsonp(
                `https://api.duckduckgo.com/?q=${searchText}&format=json&pretty=1`
            );
            const data = await res.json();
            setResults(data.RelatedTopics || []);
        } catch (error) {
            console.error("Error fetching results:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        if (!query.trim()) return;
        dispatch(addToSearchHistory(query));
        fetchSearchResults(query);
    };

    const handleInputChange = (e) => setQuery(e.target.value);

    const handleHistoryClick = (text) => {
        setQuery(text);
        dispatch(addToSearchHistory(text));
        fetchSearchResults(text);
        setDrawerOpen(false);
    };

    const handleClearHistory = () => {
        dispatch(clearSearchHistory());
    };

    return (
        <>
            <AppBar position="static" color="default" elevation={0}>
                <Toolbar>
                    <Typography variant="h4" sx={{ flexGrow: 1, textAlign: "center", my: 4 }}>
                        DuckDuckGo powered Search Engine
                    </Typography>
                    <IconButton onClick={() => setDrawerOpen(true)}>
                        <HistoryIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Container>
                <Paper sx={{ p: 3, mb: 3, backgroundColor: "#f5f5f5" }}>
                    <Typography variant="body1" color="text.primary">
                        Welcome to the DuckDuckGo-powered search engine! This app is built using modern React concepts and tools to offer you a seamless, privacy-focused search experience.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                        One of the core features of this app is its ability to maintain your search history. We use <strong>Redux</strong> for state management to store and handle the history of your searches. With <strong>Redux Persist</strong>, this history is saved even when you reload the page, providing you with a persistent and smooth user experience across sessions.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                        We also utilize the <strong>debounce</strong> technique to optimize search performance. By introducing a slight delay before sending the search request, we reduce unnecessary API calls while you type, leading to faster responses and a more efficient search experience.
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                        The app also includes a <strong>state managed history drawer</strong> where you can access and manage your search history. You can quickly view past searches and even clear the history when needed.
                    </Typography>
                </Paper>
            </Container>


            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                PaperProps={{
                    sx: {
                        width: drawerWidth,
                        height: "calc(100% - 60px)",
                        top: "60px",
                        borderTopLeftRadius: 3,
                        borderBottomLeftRadius: 3,
                        p: 2,
                    },
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                    <Typography variant="h6" fontWeight="medium">
                        Search History
                    </Typography>
                    <IconButton onClick={handleClearHistory} size="small" color="error">
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                </Box>
                <Divider sx={{ mb: 2 }} />
                {history.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                        No history yet.
                    </Typography>
                ) : (
                    <List dense>
                        {history.map((item, index) => (
                            <ListItem
                                button
                                key={`${item}-${index}`}
                                onClick={() => handleHistoryClick(item)}
                                sx={{
                                    borderRadius: 1,
                                    px: 1.5,
                                    py: 0.8,
                                    mb: 0.5,
                                    cursor: "pointer",
                                    transition: "all 0.2s ease",
                                    "&:hover": {
                                        bgcolor: "action.hover",
                                    },
                                }}
                            >
                                <ListItemText
                                    primary={item}
                                    slotProps={{
                                        primary: {
                                            noWrap: true,
                                            fontSize: 14,
                                        },
                                    }}
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
            </Drawer>

            <Container maxWidth="lg" sx={{ mt: 4 }}>
                <SearchBar
                    query={query}
                    onInputChange={handleInputChange}
                    onSearch={handleSearch}
                />
                <Box sx={{ mt: 4 }}>
                    {loading ? (
                        <SearchResultsSkeleton />
                    ) : results.length > 0 ? (
                        <SearchResults results={results} />
                    ) : (
                        <Typography
                            variant="h6"
                            color="text.secondary"
                            align="center"
                            sx={{ mt: 6 }}
                        >
                            🔎 Start typing to search using DuckDuckGo!
                        </Typography>
                    )}
                </Box>
            </Container>
        </>
    );
};

export default SearchPage;
