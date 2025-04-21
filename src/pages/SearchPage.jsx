import React, { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import { useDispatch } from "react-redux";
import { addToSearchHistory } from "../store/slices/historySlice";
import fetchJsonp from "fetch-jsonp";
import { Box, Container, Typography } from "@mui/material";
import SearchBar from "../components/Search/SearchBar";
import SuggestionsDropdown from "../components/Search/SuggestionsDropdown";
import SearchResults from "../components/Search/SearchResults";
import Loader from "../components/Loader";

const SearchPage = () => {
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    const debouncedQuery = useDebounce(query, 400);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSuggestions = async () => {
            if (!debouncedQuery) {
                setSuggestions([]);
                return;
            }

            try {
                const response = await fetchJsonp(
                    `https://duckduckgo.com/ac/?q=${debouncedQuery}`,
                    {
                        jsonpCallback: "callback",
                        timeout: 5000,
                    }
                );
                const data = await response.json();
                const phrases = data.map((item) => item.phrase);
                setSuggestions(phrases.slice(0, 8)); // Limit to 8 suggestions
            } catch (error) {
                console.error("Error fetching suggestions:", error);
            }
        };

        fetchSuggestions();
    }, [debouncedQuery]);

    const fetchSearchResults = async (searchText) => {
        setLoading(true);
        try {
            const res = await fetchJsonp(`https://api.duckduckgo.com/?q=${searchText}&format=json&pretty=1`);
            const data = await res.json();
            const topics = data.RelatedTopics || [];
            setResults(topics);
        } catch (error) {
            console.error("Error fetching results:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = () => {
        if (!query) return;
        dispatch(addToSearchHistory(query));
        fetchSearchResults(query);
        setSuggestions([]);
    };

    const handleInputChange = (event) => {
        setQuery(event.target.value);
    };

    const handleSuggestionClick = (text) => {
        setQuery(text);
        fetchSearchResults(text);
        dispatch(addToSearchHistory(text));
        setSuggestions([]);
    };

    return (
        <Container>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" mb={2}>
                    Search Engine
                </Typography>

                <SearchBar
                    query={query}
                    onInputChange={handleInputChange}
                    onSearch={handleSearch}
                />

                <SuggestionsDropdown
                    suggestions={suggestions}
                    onSuggestionClick={handleSuggestionClick}
                />

                {loading ? <Loader /> : <SearchResults results={results} />}
            </Box>
        </Container>
    );
};

export default SearchPage;
