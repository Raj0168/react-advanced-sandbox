import React from "react";
import { Typography } from "@mui/material";

const CharacterCard = React.memo(({ character, onClick }) => {
    return (
        <div
            onClick={onClick}
            style={{
                cursor: "pointer",
                padding: 8,
                width: "100%",
                height: "100%",
                boxSizing: "border-box",
            }}
        >
            <img
                loading="lazy"
                src={character?.image}
                alt={character?.name}
                style={{
                    width: "100%",
                    height: "70%",
                    borderRadius: 8,
                    objectFit: "cover",
                    display: "block",
                }}
            />
            <Typography variant="h6" noWrap>{character?.name}</Typography>
            <Typography variant="body2" color="textSecondary" noWrap>
                {character?.species} - {character?.status}
            </Typography>
        </div>
    );
});


export default CharacterCard;
