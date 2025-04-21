import React from "react";
import { Box, Typography, Link, Card, CardContent, CardMedia, Divider } from "@mui/material";

const SearchResults = ({ results }) => {
    if (!results.length) {
        return <Typography sx={{ mt: 2 }}>No results found.</Typography>;
    }

    // Extract abstract data if present
    const { AbstractText, Abstract, Image, AbstractURL } = results[0] || {};

    return (
        <Box sx={{ mt: 3 }}>
            {/* Abstract Section */}
            {AbstractText && (
                <Card sx={{ mb: 4, display: "flex", flexDirection: { xs: "column", sm: "row" }, p: 2 }}>
                    {Image && (
                        <CardMedia
                            component="img"
                            sx={{ width: { xs: "100%", sm: 200 }, height: "auto", objectFit: "contain", borderRadius: 1 }}
                            image={Image}
                            alt="Abstract"
                        />
                    )}
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            {Abstract}
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 1 }}>
                            {AbstractText}
                        </Typography>
                        {AbstractURL && (
                            <Link href={AbstractURL} target="_blank" rel="noopener noreferrer">
                                Read more →
                            </Link>
                        )}
                    </CardContent>
                </Card>
            )}

            {/* Divider */}
            {AbstractText && <Divider sx={{ mb: 3 }} />}

            {/* Related Topics Section */}
            <Typography variant="h6" gutterBottom>
                Related Results
            </Typography>

            {results.map((result, index) => {
                if (result.Text && result.FirstURL) {
                    return (
                        <Box key={index} sx={{ mb: 2 }}>
                            <Typography variant="subtitle1">
                                <Link href={result.FirstURL} target="_blank" rel="noopener noreferrer">
                                    {result.Text}
                                </Link>
                            </Typography>
                        </Box>
                    );
                } else if (result.Topics) {
                    return result.Topics.map((sub, i) => (
                        <Box key={`${index}-${i}`} sx={{ mb: 2 }}>
                            <Typography variant="subtitle1">
                                <Link href={sub.FirstURL} target="_blank" rel="noopener noreferrer">
                                    {sub.Text}
                                </Link>
                            </Typography>
                        </Box>
                    ));
                }
                return null;
            })}
        </Box>
    );
};

export default SearchResults;
