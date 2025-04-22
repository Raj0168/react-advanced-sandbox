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
} from "@mui/material";
import axios from "axios";
import Loader from "../components/Loader";

const availableLanguages = [
    { value: 'eng', label: 'English' },
    { value: 'ger', label: 'German' },
    { value: 'ben', label: 'Bengali' },
    { value: 'esp', label: 'Spanish' },
    { value: 'rus', label: 'Russian' },
    { value: 'zho', label: 'Chinese' },
    { value: 'ita', label: 'Italian' },
    { value: 'urd', label: 'Urdu' },
    { value: 'kor', label: 'Korean' },
];

const MeowPage = () => {
    const [fact, setFact] = useState("");
    const [language, setLanguage] = useState("eng");
    const [loading, setLoading] = useState(false);

    const fetchFact = async () => {
        try {
            setLoading(true);
            const res = await axios.get(`https://meowfacts.herokuapp.com/?lang=${language}`);
            setFact(res?.data?.data[0]);
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
            <Typography variant="h5" gutterBottom>
                {`This Page uses React Router's <Outlet /> to restrict any unauthorized access.`}<br />
                {`No nesting of HOCs - `}
                {`Route-based, declarative auth protection`}
            </Typography>
            <Box component="hr" sx={{ my: 2 }} />

            {fact && (
                loading ? (
                    <Loader />
                ) : (
                    <>
                        <Typography sx={{ my: 2 }} variant="h4">Here is a random Cat fact for you</Typography>
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

export default MeowPage;
