import React, { useEffect, useMemo, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { Typography, Box } from "@mui/material";
import Loader from "../Loader";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";

const ITEM_HEIGHT = 60;

const ResidentList = React.memo(({ urls }) => {
    const [residents, setResidents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const fetchResidents = async () => {
            setLoading(true);
            try {
                const responses = await Promise.all(
                    urls.map(url => axiosInstance.get(url).then(res => res.data))
                );
                if (isMounted) {
                    setResidents(responses);
                }
            } catch (error) {
                console.error("Failed to load residents", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchResidents();

        return () => {
            isMounted = false;
        };
    }, [urls]);

    const itemCount = useMemo(() => residents.length, [residents]);

    if (loading) return <Loader />;

    if (residents.length === 0)
        return <Typography>No residents found.</Typography>;

    return (
        <Box sx={{ height: 300, mt: 2 }}>
            <AutoSizer>
                {({ height, width }) => (
                    <List
                        height={height}
                        width={width}
                        itemCount={itemCount}
                        itemSize={ITEM_HEIGHT}
                    >
                        {({ index, style }) => {
                            const resident = residents[index];
                            return (
                                <div style={style} key={resident.id}>
                                    <Box sx={{ display: "flex", alignItems: "center" }}>
                                        <img
                                            loading="lazy"
                                            src={resident?.image}
                                            alt={resident?.name}
                                            style={{
                                                width: 40,
                                                height: 40,
                                                borderRadius: "50%",
                                                objectFit: "cover",
                                                marginRight: 16,
                                            }}
                                        />
                                        <Typography variant="body2">
                                            {resident?.name}
                                        </Typography>
                                    </Box>
                                </div>
                            );
                        }}
                    </List>
                )}
            </AutoSizer>
        </Box>
    );
});

export default ResidentList;
