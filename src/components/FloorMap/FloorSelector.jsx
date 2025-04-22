import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

export default function FloorSelector({ floors, selected, onChange }) {
    return (
        <FormControl sx={{ mb: 2 }}>
            <InputLabel id="floor-select-label">Select Floor</InputLabel>
            <Select
                labelId="floor-select-label"
                value={selected}
                label="Select Floor"
                onChange={(e) => onChange(e.target.value)}
            >
                {floors.map((floor) => (
                    <MenuItem key={floor.id} value={floor.id}>
                        {floor.label}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
