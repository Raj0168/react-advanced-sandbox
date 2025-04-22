import React, { useState } from "react";
import { Typography, Container, Paper, FormControl, InputLabel, MenuItem, TextField, Select, Button } from "@mui/material";
import useFetch from "../hooks/useFetch";
import Loader from '../components/Loader';

const availableEndpoints = [
    { label: "Sonnets", value: "https://poetrydb.org/title,random/Sonnet;3" },
    { label: "Cat Facts", value: "https://meowfacts.herokuapp.com" },
    { label: "Country Details", value: "http://geodb-free-service.wirefreethought.com/v1/geo/countries/FR" },
    { label: "Memes", value: "https://api.imgflip.com/get_memes" },
    { label: "Posts", value: "https://jsonplaceholder.typicode.com/posts" },
];

const FetchPage = () => {
    const [url, setUrl] = useState(availableEndpoints[0].value);
    const [customUrl, SetCustomUrl] = useState("");
    const [finalUrl, setFinalUrl] = useState(url);

    const { data, loading, error } = useFetch(finalUrl);

    const handleSelectChange = (event) => {
        setUrl(event.target.value);
        SetCustomUrl("");
    }

    const handleFetch = () => {
        setFinalUrl(customUrl || url);
    }

    return (
        <Container sx={{ my: 3, display: 'flex', justifyContent: 'center', flexDirection: "column", alignItems: 'center' }}>

            <Paper sx={{ p: 3, mb: 3, backgroundColor: "#f5f5f5" }}>
                <Typography variant="h4" gutterBottom>
                    Fetch Page
                </Typography>

                <Typography variant="h5" marginY={2}>
                    Welcome to the Fetch Page! This page demonstrates how to use a custom React hook, <strong>useFetch</strong>, to perform HTTP requests and render the data dynamically.
                </Typography>

                <Typography variant="body1" color="text.primary">
                    The <strong>useFetch</strong> hook abstracts the logic for performing fetch requests. It takes a URL as input and returns data, loading state, and any errors encountered. This approach enhances code reusability and simplifies the process of fetching data in multiple components.
                </Typography>

                <Typography variant="body1" color="text.primary" sx={{ mt: 2 }}>
                    Users can either select from predefined endpoints or input a custom URL. The fetched response is rendered in a styled, scrollable container for easy viewing and debugging.
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
                    <strong>Why a custom hook?</strong><br />
                    Custom hooks like <strong>useFetch</strong> help encapsulate reusable logic, keeping component code clean and focused on rendering UI. This improves maintainability and reduces code duplication.
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    <strong>State Management:</strong><br />
                    The page uses <strong>React's useState</strong> to manage the selected URL, custom input, and the final URL used for fetching. This dynamic state setup ensures flexibility in switching endpoints.
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    <strong>Global Feedback:</strong><br />
                    We use a <strong>Redux-managed Snackbar</strong> to display global messages such as fetch errors or success notifications. This centralized approach ensures consistent and user-friendly feedback across the application.
                </Typography>
            </Paper>


            <FormControl sx={{ mt: 5, py: 2, width: "350px" }}>
                <InputLabel id="select-label">Select an Endpoint</InputLabel>
                <Select label="Select endpoint" labelId="select-label" value={url} onChange={handleSelectChange}>
                    {availableEndpoints.map((endpoint) => (
                        <MenuItem key={endpoint.value} value={endpoint.value}>
                            {endpoint.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <TextField sx={{ mb: 2, width: "350px" }}
                label="Or enter any URL"
                value={customUrl}
                onChange={(event) => SetCustomUrl(event.target.value)}
                placeholder="https://..."
            />

            <Button variant="contained" onClick={handleFetch} sx={{ mb: 3 }}>Fetch Data</Button>

            {loading ? (
                <Loader />
            ) : error ? (
                <Typography color="error" variant="body1">{error}</Typography>
            ) : data ? (
                <pre style={{
                    wordBreak: "break-word", textAlign: 'left', width: '100%', maxHeight: '400px', overflowY: 'auto', backgroundColor: "#333", color: "#fff", padding: "1rem"

                }}>
                    {JSON.stringify(data, null, 2)}
                </pre>

            ) : (
                <Typography variant="body1">No data to display.</Typography>
            )
            }
        </Container >
    );
};

export default FetchPage;
