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
    Paper,
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
            <Paper sx={{ p: 3, mb: 3, backgroundColor: "#f5f5f5" }}>
                <Typography textAlign="center" variant="h4" gutterBottom>
                    Meow Facts Page
                </Typography>

                <Typography variant="body1" color="text.secondary" sx={{ mt: 2 }}>
                    This page utilizes route-based protection using <strong>React Router’s &lt;Outlet /&gt;</strong> feature, ensuring that only authenticated users can access it.
                </Typography>

                <Typography variant="body1" sx={{ mt: 2 }}>
                    A random cat fact is fetched using <strong>Axios</strong> whenever the selected language changes. This demonstrates dynamic API calls based on state, and a clean separation of concerns using React hooks.
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    <strong>Multilingual Support:</strong><br />
                    Users can choose from a wide array of languages including Bengali, Korean, Urdu, and more. The fact will then be retrieved in the selected language (depending on API support).
                </Typography>

                <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                    This page is an example of declarative, clean component structure without deeply nested HOCs—everything is controlled via routes and context where needed.
                </Typography>

            </Paper>

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
