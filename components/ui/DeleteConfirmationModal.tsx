"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
} from "@mui/material";
import { FaTrash, FaTimes, FaExclamationTriangle } from "react-icons/fa";

interface DeleteConfirmationModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  message?: string;
  itemName?: string;
  itemType?: string;
}

export default function DeleteConfirmationModal({
  open,
  onClose,
  onConfirm,
  title = "Confirm Deletion",
  message,
  itemName,
  itemType = "item",
}: DeleteConfirmationModalProps) {
  const defaultMessage =
    message ||
    `Are you sure you want to delete "${itemName}"? This action cannot be undone.`;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.2)",
        },
      }}
    >
      <DialogTitle sx={{ pb: 1 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Box
              sx={{
                p: 1.5,
                borderRadius: 2,
                backgroundColor: "error.main",
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FaExclamationTriangle size={20} />
            </Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 600, color: "text.primary" }}
            >
              {title}
            </Typography>
          </Box>
          <IconButton
            onClick={onClose}
            sx={{
              color: "text.secondary",
              "&:hover": {
                backgroundColor: "action.hover",
              },
            }}
          >
            <FaTimes size={16} />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ py: 3 }}>
        <Typography
          variant="body1"
          sx={{ color: "text.primary", lineHeight: 1.6 }}
        >
          {defaultMessage}
        </Typography>

        <Box
          sx={{
            mt: 3,
            p: 2,
            borderRadius: 2,
            backgroundColor: "error.light",
            border: "1px solid",
            borderColor: "error.main",
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: "error.dark", fontWeight: 500 }}
          >
            ⚠️ Warning: This action is permanent and cannot be undone.
          </Typography>
        </Box>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0, gap: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1,
            fontWeight: 500,
            textTransform: "none",
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleConfirm}
          variant="contained"
          color="error"
          startIcon={<FaTrash />}
          sx={{
            borderRadius: 2,
            px: 3,
            py: 1,
            fontWeight: 500,
            textTransform: "none",
            boxShadow: "0 4px 12px rgba(244, 67, 54, 0.3)",
            "&:hover": {
              boxShadow: "0 6px 16px rgba(244, 67, 54, 0.4)",
            },
          }}
        >
          Delete {itemType}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
