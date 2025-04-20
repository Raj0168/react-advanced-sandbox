import React, { useState } from "react";
import { Typography, Container, FormControl, InputLabel, MenuItem, TextField, Select, Button } from "@mui/material";
import useFetch from "../hooks/fetchData";
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
        <Container sx={{ py: 5, display: 'flex', justifyContent: 'center', flexDirection: "column", alignItems: 'center' }}>
            <Typography variant="h4">Fetch Page</Typography>
            <Typography marginY={2} variant="h5">
                Hi! this is the fetch requests page, which uses a custom fetchData hook. It will render the response below.
            </Typography>

            <FormControl sx={{ mb: 2, width: "350px" }}>
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
