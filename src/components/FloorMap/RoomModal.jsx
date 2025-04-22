import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from "@mui/material";
import { statusColors } from "../../data/mockRoomData";

export default function RoomModal({ room, onSave, onCancel }) {
    const [status, setStatus] = useState(room.status);
    const [facility, setFacility] = useState(room.facility);

    const handleSave = () => {
        onSave({ id: room.id, status, facility });
    };

    return (
        <Dialog open onClose={onCancel}>
            <DialogTitle>Update {room?.id?.toUpperCase()}</DialogTitle>
            <DialogContent>
                <FormControl fullWidth sx={{ my: 2 }}>
                    <InputLabel>Status</InputLabel>
                    <Select
                        value={status}
                        label="Status"
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        {Object.keys(statusColors).map((key) => (
                            <MenuItem key={key} value={key}>
                                {key}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <TextField
                    label="Facility"
                    value={facility}
                    onChange={(e) => setFacility(e.target.value)}
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={handleSave} variant="contained">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}
