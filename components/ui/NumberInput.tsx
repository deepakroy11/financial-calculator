"use client";

import { useState, useEffect } from "react";
import { TextField, Typography, Box, InputAdornment } from "@mui/material";

interface NumberInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  placeholder?: string;
  suffix?: string;
  prefix?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  min?: number;
  max?: number;
  step?: number;
  showInWords?: boolean;
}

// Function to convert number to words (Indian format)
const numberToWords = (num: number): string => {
  if (num === 0) return "Zero";

  const ones = [
    "",
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
  ];
  const teens = [
    "Ten",
    "Eleven",
    "Twelve",
    "Thirteen",
    "Fourteen",
    "Fifteen",
    "Sixteen",
    "Seventeen",
    "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "",
    "",
    "Twenty",
    "Thirty",
    "Forty",
    "Fifty",
    "Sixty",
    "Seventy",
    "Eighty",
    "Ninety",
  ];

  const convertHundreds = (n: number): string => {
    let result = "";

    if (n >= 100) {
      result += ones[Math.floor(n / 100)] + " Hundred ";
      n %= 100;
    }

    if (n >= 20) {
      result += tens[Math.floor(n / 10)] + " ";
      n %= 10;
    } else if (n >= 10) {
      result += teens[n - 10] + " ";
      return result;
    }

    if (n > 0) {
      result += ones[n] + " ";
    }

    return result;
  };

  if (num < 0) return "Negative " + numberToWords(-num);

  let result = "";

  // Crores
  if (num >= 10000000) {
    result += convertHundreds(Math.floor(num / 10000000)) + "Crore ";
    num %= 10000000;
  }

  // Lakhs
  if (num >= 100000) {
    result += convertHundreds(Math.floor(num / 100000)) + "Lakh ";
    num %= 100000;
  }

  // Thousands
  if (num >= 1000) {
    result += convertHundreds(Math.floor(num / 1000)) + "Thousand ";
    num %= 1000;
  }

  // Hundreds
  if (num > 0) {
    result += convertHundreds(num);
  }

  return result.trim();
};

export default function NumberInput({
  label,
  value,
  onChange,
  placeholder,
  suffix,
  prefix,
  error,
  required = false,
  disabled = false,
  min = 0,
  max,
  step = 1,
  showInWords = true,
}: NumberInputProps) {
  const [displayValue, setDisplayValue] = useState<string>("");
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    // Only update display value if not focused to avoid cursor jumping
    if (!focused) {
      setDisplayValue(value === 0 ? "" : value.toString());
    }
  }, [value, focused]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setDisplayValue(inputValue);

    // Handle empty string or just whitespace
    if (inputValue === "" || inputValue.trim() === "") {
      onChange(0);
      return;
    }

    // Remove any non-numeric characters except decimal point
    const cleanValue = inputValue.replace(/[^0-9.]/g, "");

    // Parse the number
    const numValue = parseFloat(cleanValue);

    if (!isNaN(numValue)) {
      // Apply min/max constraints
      let constrainedValue = numValue;
      if (min !== undefined && constrainedValue < min) {
        constrainedValue = min;
      }
      if (max !== undefined && constrainedValue > max) {
        constrainedValue = max;
      }

      onChange(constrainedValue);
    }
  };

  const handleFocus = () => {
    setFocused(true);
    // If value is 0, clear the display
    if (value === 0) {
      setDisplayValue("");
    }
  };

  const handleBlur = () => {
    setFocused(false);
    // If empty, set to 0
    if (displayValue === "" || displayValue.trim() === "") {
      setDisplayValue("");
      onChange(0);
    } else {
      // Format the display value
      setDisplayValue(value.toString());
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <TextField
        fullWidth
        label={label}
        value={displayValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        error={!!error}
        helperText={error}
        required={required}
        disabled={disabled}
        inputProps={{
          min,
          max,
          step,
        }}
        InputProps={{
          startAdornment: prefix ? (
            <InputAdornment position="start">{prefix}</InputAdornment>
          ) : undefined,
          endAdornment: suffix ? (
            <InputAdornment position="end">{suffix}</InputAdornment>
          ) : undefined,
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
          },
        }}
      />

      {/* Show amount in words */}
      {showInWords && value > 0 && (
        <Box sx={{ mt: 1 }}>
          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ fontStyle: "italic" }}
          >
            {suffix === "₹" || prefix === "₹" ? formatCurrency(value) : ""} •{" "}
            {numberToWords(value)}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
