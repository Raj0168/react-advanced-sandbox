import React, { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Link } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Link as RouterLink } from "react-router-dom";

const ExpandableList = ({ title, items }) => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = () => {
        setExpanded(!expanded);
    };

    return (
        <Accordion expanded={expanded} onChange={handleChange}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel-content" id="panel-header">
                <Typography variant="h6">{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                {items.map((item, index) => (
                    <Link
                        key={index}
                        component={RouterLink}
                        to={item.route}
                        style={{ textDecoration: "none" }}
                    >
                        <Typography variant="body2" sx={{ marginBottom: 1 }}>
                            <strong>{item.label}</strong> - {item.route}
                        </Typography>
                    </Link>
                ))}
            </AccordionDetails>
        </Accordion>
    );
};

export default ExpandableList;
