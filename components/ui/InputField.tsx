"use client";

import { TextField } from "@mui/material";
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
    <div className="w-full">
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
            <span className="text-gray-500 text-sm font-medium bg-gray-100 px-2 py-1 rounded">
              {suffix}
            </span>
          ) : null,
        }}
        variant="outlined"
        size="medium"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "12px",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(10px)",
            "& fieldset": {
              borderColor: "#e2e8f0",
              borderWidth: "2px",
            },
            "&:hover fieldset": {
              borderColor: "#cbd5e1",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#667eea",
              borderWidth: "2px",
            },
          },
          "& .MuiInputLabel-root": {
            color: "#64748b",
            fontWeight: 500,
            "&.Mui-focused": {
              color: "#667eea",
            },
          },
          "& .MuiOutlinedInput-input": {
            padding: "16px 14px",
            fontSize: "16px",
            fontWeight: 500,
          },
        }}
      />
    </div>
  );
}
