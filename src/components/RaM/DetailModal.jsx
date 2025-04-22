import { PureComponent } from "react";
import axiosInstance from "../../utils/axiosInstance";
import Loader from "../Loader";
import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import ResidentList from "./ResidentList";
import SkeletonFallback from "../../utils/SkeletonFallback";

class DetailModal extends PureComponent {
    state = {
        details: null,
        loading: false,
        error: null,
    };

    componentDidUpdate(prevProps) {
        const { open, url } = this.props;

        if (open && !prevProps.open) {
            this.fetchDetails();
        }

        if (url !== prevProps.url) {
            this.fetchDetails();
        }

        if (!open && prevProps.open) {
            this.setState({ details: null });
        }
    }


    fetchDetails = async () => {
        const { url } = this.props;
        if (!url) return;
        this.setState({ loading: true, error: null });

        try {
            const response = await axiosInstance.get(url);
            this.setState({ details: response.data });
        } catch (err) {
            this.setState({ error: err });
        } finally {
            this.setState({ loading: false });
        }
    };



    renderContent = () => {
        const { details, loading, error } = this.state;
        const { type } = this.props;


        if (loading) return <SkeletonFallback />;
        if (error) return <Typography color="error">Error: {error.message}</Typography>;
        if (!details) return <Typography>No details available</Typography>;

        if (type === "character") {
            return (
                <>
                    <img src={details?.image} loading="lazy"
                        alt={details?.name} style={{ width: "100%", borderRadius: 8 }} />
                    <Typography variant="h5">{details?.name}</Typography>
                    <Typography>{details.species} - {details.status}</Typography>
                    <Typography>Gender: {details.gender}</Typography>
                    <Typography>Origin: {details.origin?.name}</Typography>
                    <Typography>Location: {details.location?.name}</Typography>
                </>
            );
        } else if (type === "location") {
            return (
                <>
                    <Typography variant="h5">{details?.name}</Typography>
                    <Typography>Type: {details?.type}</Typography>
                    <Typography>Dimension: {details?.dimension}</Typography>
                    <Typography>Residents:</Typography>
                    {/* <ul>
                        {details?.residents.map((url, i) => (
                            <li key={i}>{url}</li>
                        ))}
                    </ul> */}
                    <ResidentList urls={details?.residents} />
                </>
            );
        }
    };


    render() {
        const { open, onClose, type } = this.props;

        return (
            <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
                <DialogTitle>{type === "character" ? "Character Details" : "Location Details"}</DialogTitle>
                <DialogContent>{this.renderContent()}</DialogContent>
            </Dialog>
        );
    }
}

export default DetailModal;
