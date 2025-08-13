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
      className="w-full shadow-lg border border-gray-200"
      sx={{
        borderRadius: "16px",
        background: "white",
      }}
    >
      <CardContent className="p-6">
        <div className="mb-6">
          <Typography
            variant="h5"
            component="h2"
            className="mb-2 font-bold text-gray-800"
          >
            {title}
          </Typography>
          <Typography variant="body2" className="text-gray-600 leading-relaxed">
            {description}
          </Typography>
        </div>

        <div className="space-y-4 mb-6">{children}</div>

        <Box className="flex gap-3 flex-col sm:flex-row">
          <Button
            variant="contained"
            onClick={onCalculate}
            disabled={isCalculating}
            className="flex-1 py-3 text-base font-semibold"
            size="large"
            sx={{
              backgroundColor: "#2563eb",
              borderRadius: "12px",
              textTransform: "none",
              boxShadow: "0 4px 12px rgba(37, 99, 235, 0.3)",
              "&:hover": {
                backgroundColor: "#1d4ed8",
                boxShadow: "0 6px 16px rgba(37, 99, 235, 0.4)",
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
