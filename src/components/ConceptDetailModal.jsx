import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    Typography,
    IconButton,
    useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { motion, AnimatePresence } from "framer-motion";

export default function ConceptDetailModal({ open, onClose, concept }) {
    const theme = useTheme();
    if (!concept) return null;

    return (
        <AnimatePresence>
            {open && (
                <Dialog
                    open
                    onClose={onClose}
                    slotProps={{
                        paper: {
                            component: motion.div,
                            initial: { scale: 0.8, opacity: 0 },
                            animate: { scale: 1, opacity: 1 },
                            exit: { scale: 0.8, opacity: 0 },
                            transition: { duration: 0.3 },
                            sx: {
                                backgroundColor: theme.palette.background.paper,
                                borderRadius: 2,
                            },
                        },
                        backdrop: {
                            sx: {
                                backdropFilter: "blur(4px)",
                                backgroundColor: "rgba(0, 0, 0, 0.5)",
                            },
                        },
                    }}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle sx={{ m: 0, p: 2 }}>
                        {concept.label}
                        <IconButton
                            aria-label="close"
                            onClick={onClose}
                            sx={{ position: "absolute", right: 8, top: 8 }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>

                    <DialogContent dividers>
                        <Typography variant="body1" paragraph>
                            {concept.detail}
                        </Typography>
                    </DialogContent>
                </Dialog>
            )}
        </AnimatePresence>
    );
}
