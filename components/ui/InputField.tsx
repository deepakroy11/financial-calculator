"use client";

import { TextField, Box } from "@mui/material";
import { ChangeEvent } from "react";

interface InputFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "number";
  error?: string;
  suffix?: string;
  required?: boolean;
}

export default function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "number",
  error,
  suffix,
  required = false,
}: InputFieldProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <TextField
        fullWidth
        label={label}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        type={type}
        error={!!error}
        helperText={error}
        required={required}
        InputProps={{
          endAdornment: suffix ? (
            <Box
              component="span"
              sx={{
                color: "text.primary",
                fontSize: "0.875rem",
                fontWeight: 600,
                backgroundColor: (theme) =>
                  theme.palette.mode === "dark"
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.05)",
                border: 1,
                borderColor: "divider",
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
              }}
            >
              {suffix}
            </Box>
          ) : null,
        }}
        variant="outlined"
        size="medium"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            backgroundColor: "background.paper",
            "& fieldset": {
              borderColor: "divider",
              borderWidth: "2px",
            },
            "&:hover fieldset": {
              borderColor: "primary.light",
            },
            "&.Mui-focused fieldset": {
              borderColor: "primary.main",
              borderWidth: "2px",
            },
          },
          "& .MuiInputLabel-root": {
            color: "text.secondary",
            fontWeight: 500,
            "&.Mui-focused": {
              color: "primary.main",
            },
          },
          "& .MuiOutlinedInput-input": {
            padding: "16px 14px",
            fontSize: "16px",
            fontWeight: 500,
            color: "text.primary",
          },
        }}
      />
    </Box>
  );
}
