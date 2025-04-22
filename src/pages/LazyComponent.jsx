import React, { useEffect, useState } from "react";
import {
    Container,
    Typography,
    Box,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Paper
} from "@mui/material";
import axios from "axios";
import Loader from "../components/Loader";

const availableLanguages = [
    { value: 'en', label: 'English' },
    { value: 'de', label: 'German' },
];

const LazyComponent = () => {
    const [fact, setFact] = useState("");
    const [language, setLanguage] = useState("en");
    const [loading, setLoading] = useState(false);

    const fetchFact = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`https://uselessfacts.jsph.pl/api/v2/facts/random?language=${language}`);
            setFact(res?.data?.text);
        } catch (err) {
            console.error("Failed to fetch api: ", err);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (event) => {
        const { value } = event.target;
        setLanguage(value);
    }

    useEffect(() => {
        fetchFact();
    }, [language]);

    return (
        <Container sx={{ py: 5, display: 'flex', justifyContent: 'center', flexDirection: "column", alignItems: 'center', }}>
            <Paper sx={{ p: 3, mb: 3, backgroundColor: "#f5f5f5" }}>
                <Typography variant="h4">Lazy Loaded Component</Typography>

                <Typography marginY={2} variant="body1" >
                    Welcome to the Lazy Loaded Component page! Here, we fetch a random useless fact, and the content is fetched lazily based on the language selected. This page demonstrates how you can load content only when it's required by the user.
                </Typography>

                <Typography variant="body1" color="text.primary">
                    The concept of lazy loading is implemented in this component by fetching data only when the component is rendered and when a user interacts with the language dropdown. This ensures that unnecessary data is not fetched upfront, optimizing performance.
                </Typography>
            </Paper>

            <Box component="hr" sx={{ my: 2 }} />

            {fact && (
                loading ? (
                    <Loader />
                ) : (
                    <>
                        <Typography sx={{ my: 2 }} variant="h4">Here is a random useless fact for you</Typography>
                        <Typography variant="h5" sx={{ my: 2 }}>{fact}</Typography>
                        <div style={{ display: "flex", alignItems: 'center', gap: "50px", }}>
                            <Button variant="contained" onClick={() => fetchFact()}>Randomize</Button>
                            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                                <InputLabel id="language-select-label">Language</InputLabel>
                                <Select
                                    labelId="language-select" id="language-selector" name="language" value={language} label="Language" onChange={handleChange}>
                                    {availableLanguages.map((language) => (
                                        <MenuItem key={language.value}
                                            value={language.value}>
                                            {language.label}
                                        </MenuItem>

                                    ))}
                                </Select>
                            </FormControl>
                        </div>
                    </>
                )
            )}

        </Container >
    );
};

export default LazyComponent;
