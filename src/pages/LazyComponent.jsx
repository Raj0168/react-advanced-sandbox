import React, { useEffect, useRef, useState } from "react";
import {
    Container,
    Typography,
    Box,
    Button,
} from "@mui/material";
import axios from "axios";
import Loader from "../components/Loader";

const availableLanguages = ["EN", "DE"];

const LazyComponent = () => {
    const [fact, setFact] = useState("");
    const [language, setLanguage] = useState("");
    const [loading, setLoading] = useState(false);
    const newFact = useRef();
    const [fetchTrigger, setFetchTrigger] = useState(1);


    const fetchFact = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`https://uselessfacts.jsph.pl/api/v2/facts/random?language=en`);
            setFact(res?.data?.text);
            setLanguage(res?.data?.language);
        } catch (err) {
            console.error("Failed to fetch api: ", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFact();
    }, [fetchTrigger]);

    return (
        <Container sx={{ py: 5, display: 'flex', justifyContent: 'center', flexDirection: "column", alignItems: 'center', }}>
            <Typography variant="h3" gutterBottom>
                This is a lazily loaded page!!
            </Typography>
            <Box component="hr" sx={{ my: 2 }} />

            {fact && (
                loading ? (
                    <Loader />
                ) : (
                    <>
                        <Typography sx={{ my: 2 }} variant="h4">Here is a random useless fact for you</Typography>
                        <Typography variant="h5">Fact #{fetchTrigger}</Typography>
                        <Typography variant="h5">{fact}</Typography>
                        <Button sx={{ my: 2 }} variant="contained" onClick={() => setFetchTrigger(prev => prev + 1)}>Randomize</Button>
                    </>
                )
            )}

        </Container >
    );
};

export default LazyComponent;
