"use client";

import { Card, CardContent, Typography, Button, Box } from "@mui/material";
import { ReactNode } from "react";

interface CalculatorCardProps {
  title: string;
  description: string;
  children: ReactNode;
  onCalculate: () => void;
  onReset: () => void;
  isCalculating?: boolean;
}

export default function CalculatorCard({
  title,
  description,
  children,
  onCalculate,
  onReset,
  isCalculating = false,
}: CalculatorCardProps) {
  return (
    <Card
      sx={{
        width: "100%",
        borderRadius: 4,
        backgroundColor: "background.paper",
        border: 1,
        borderColor: "divider",
        boxShadow: (theme) =>
          theme.palette.mode === "dark"
            ? "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)"
            : "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              mb: 1,
              fontWeight: 700,
              color: "text.primary",
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              lineHeight: 1.6,
            }}
          >
            {description}
          </Typography>
        </Box>

        <Box sx={{ mb: 3 }}>{children}</Box>

        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <Button
            variant="contained"
            onClick={onCalculate}
            disabled={isCalculating}
            className="flex-1 py-3 text-base font-semibold"
            size="large"
            sx={{
              backgroundColor: "#1f7a99",
              borderRadius: "12px",
              textTransform: "none",
              boxShadow: "0 4px 12px rgba(31, 122, 153, 0.3)",
              "&:hover": {
                backgroundColor: "#155a73",
                boxShadow: "0 6px 16px rgba(31, 122, 153, 0.4)",
                transform: "translateY(-1px)",
              },
              transition: "all 0.2s ease",
            }}
          >
            {isCalculating ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Calculating...
              </div>
            ) : (
              "Calculate"
            )}
          </Button>
          <Button
            variant="outlined"
            onClick={onReset}
            className="flex-1 py-3 text-base font-semibold"
            size="large"
            sx={{
              borderColor: "#d1d5db",
              color: "#6b7280",
              borderRadius: "12px",
              textTransform: "none",
              borderWidth: "1px",
              "&:hover": {
                borderColor: "#9ca3af",
                backgroundColor: "#f9fafb",
                transform: "translateY(-1px)",
              },
              transition: "all 0.2s ease",
            }}
          >
            Reset
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
