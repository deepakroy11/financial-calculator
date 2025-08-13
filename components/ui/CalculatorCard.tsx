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
      className="w-full max-w-3xl mx-auto shadow-2xl border-0"
      sx={{
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "20px",
      }}
    >
      <CardContent className="p-8">
        <div className="text-center mb-8">
          <Typography
            variant="h4"
            component="h2"
            className="mb-3 font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
          >
            {title}
          </Typography>
          <Typography
            variant="body1"
            className="text-gray-600 leading-relaxed max-w-2xl mx-auto"
          >
            {description}
          </Typography>
        </div>

        <div className="space-y-6 mb-8">{children}</div>

        <Box className="flex gap-4 flex-col sm:flex-row">
          <Button
            variant="contained"
            onClick={onCalculate}
            disabled={isCalculating}
            className="flex-1 py-4 text-lg font-semibold"
            size="large"
            sx={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              borderRadius: "12px",
              textTransform: "none",
              boxShadow: "0 8px 32px rgba(102, 126, 234, 0.3)",
              "&:hover": {
                background: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
                boxShadow: "0 12px 40px rgba(102, 126, 234, 0.4)",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            {isCalculating ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Calculating...
              </div>
            ) : (
              "Calculate"
            )}
          </Button>
          <Button
            variant="outlined"
            onClick={onReset}
            className="flex-1 py-4 text-lg font-semibold"
            size="large"
            sx={{
              borderColor: "#e2e8f0",
              color: "#64748b",
              borderRadius: "12px",
              textTransform: "none",
              borderWidth: "2px",
              "&:hover": {
                borderColor: "#cbd5e1",
                backgroundColor: "#f8fafc",
                transform: "translateY(-2px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            Reset
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
}
