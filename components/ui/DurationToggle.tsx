"use client";

import {
  ToggleButton,
  ToggleButtonGroup,
  Box,
  Typography,
} from "@mui/material";

interface DurationToggleProps {
  value: "months" | "years";
  onChange: (value: "months" | "years") => void;
  label?: string;
}

export default function DurationToggle({
  value,
  onChange,
  label = "Duration Unit",
}: DurationToggleProps) {
  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newValue: "months" | "years" | null
  ) => {
    if (newValue !== null) {
      onChange(newValue);
    }
  };

  return (
    <Box sx={{ mb: 2 }}>
      {label && (
        <Typography
          variant="body2"
          sx={{
            mb: 1,
            color: "text.secondary",
            fontWeight: 500,
          }}
        >
          {label}
        </Typography>
      )}
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={handleChange}
        size="small"
        sx={{
          "& .MuiToggleButton-root": {
            px: 2,
            py: 1,
            margin: 0.5,
            borderRadius: 2,
            textTransform: "none",
            fontWeight: 500,
            color: "text.secondary",
            borderColor: "divider",
            "&:hover": {
              backgroundColor: "action.hover",
              color: "text.primary",
            },
            "&.Mui-selected": {
              backgroundColor: "primary.main",
              color: "primary.contrastText",
              borderColor: "primary.main",
              "&:hover": {
                backgroundColor: "primary.dark",
              },
            },
          },
        }}
      >
        <ToggleButton value="months">Months</ToggleButton>
        <ToggleButton value="years">Years</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}
