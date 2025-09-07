"use client";

import { TextField, Box, Typography } from "@mui/material";
import { ChangeEvent } from "react";
import {
  formatCurrencyInWords,
  formatPercentageInWords,
  formatYearsInWords,
  formatMonthsInWords,
  numberToWords,
} from "../../utils/numberToWords";

interface InputFieldProps {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "number";
  error?: string;
  suffix?: string;
  required?: boolean;
  showWordsFor?: "currency" | "percentage" | "years" | "months" | "number";
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
  showWordsFor,
}: InputFieldProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  // Convert value to words based on type
  const getValueInWords = () => {
    const numValue = parseFloat(value.toString());
    if (isNaN(numValue) || numValue <= 0 || !showWordsFor) return "";

    switch (showWordsFor) {
      case "currency":
        return formatCurrencyInWords(numValue);
      case "percentage":
        return formatPercentageInWords(numValue);
      case "years":
        return formatYearsInWords(numValue);
      case "months":
        return formatMonthsInWords(numValue);
      case "number":
        return numberToWords(numValue);
      default:
        return "";
    }
  };

  const wordsDisplay = getValueInWords();

  return (
    <Box sx={{ mb: { xs: 2, sm: 3 } }}>
      <TextField
        fullWidth
        label={String(label)}
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
                px: { xs: 1, sm: 1.5 },
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
            borderRadius: { xs: "8px", sm: "12px" },
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
            padding: { xs: "14px 12px", sm: "16px 14px" },
            fontSize: "16px",
            fontWeight: 500,
            color: "text.primary",
          },
        }}
      />

      {/* Display value in words */}
      {wordsDisplay && (
        <Typography
          variant="body2"
          sx={{
            mt: 1,
            px: 1,
            color: "text.secondary",
            fontSize: { xs: "0.7rem", sm: "0.75rem" },
            fontStyle: "italic",
            opacity: 0.8,
          }}
        >
          {wordsDisplay}
        </Typography>
      )}
    </Box>
  );
}
