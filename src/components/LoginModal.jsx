import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../store/slices/userSlice";
import { Box, Button, Dialog, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { showReduxSnackbar } from "../store/slices/snackbarSlice";

const professionsList = [
    "Student", "Developer", "Analyst", "Manager"
];

const LoginModal = ({ open, onClose }) => {
    const [username, setUsername] = useState("");
    const [profession, setProfession] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleChange = (event) => {
        const { value } = event.target;
        setProfession(value);
    }

    const handleLogin = () => {
        if (username && profession) {
            dispatch(login({ username, profession }));
            onClose();
            setUsername("");
            setProfession("");
            dispatch(showReduxSnackbar({ message: "Successfully logged in", severity: "success" }));
            navigate("/");
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Login</DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" gap={2} mt={1} width={300}>
                    <TextField label="username" value={username} onChange={(event) => setUsername(event.target.value)} autoFocus />

                    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                        <InputLabel id="profession-label">Profession</InputLabel>
                        <Select labelId="profession-select" id="profession-select-id" name="profession" value={profession} label="Profession" onChange={handleChange}>
                            {professionsList.map((prof, index) => (
                                <MenuItem key={index} value={prof}>{prof}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Button variant="contained" onClick={handleLogin}>
                        Login
                    </Button>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default LoginModal;