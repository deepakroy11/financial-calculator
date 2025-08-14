"use client";

import { Card, CardContent, Typography, Box } from "@mui/material";

interface ResultItem {
  label: string;
  value: string;
  highlight?: boolean;
}

interface ResultCardProps {
  title: string;
  results: ResultItem[];
  explanation?: string;
}

export default function ResultCard({
  title,
  results,
  explanation,
}: ResultCardProps) {
  return (
    <Card
      sx={{
        width: "100%",
        mt: 3,
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
        <Typography
          variant="h6"
          component="h3"
          sx={{
            mb: 2,
            fontWeight: 700,
            color: "text.primary",
          }}
        >
          {title}
        </Typography>

        <Box sx={{ "& > *": { mb: 1.5 } }}>
          {results.map((result, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
                borderRadius: 3,
                transition: "all 0.2s ease-in-out",
                backgroundColor: result.highlight
                  ? "primary.light"
                  : "action.hover",
                border: 1,
                borderColor: result.highlight ? "primary.main" : "divider",
                ...(result.highlight && {
                  color: "primary.contrastText",
                }),
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: result.highlight ? "inherit" : "text.primary",
                  fontWeight: 500,
                }}
              >
                {result.label}
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: result.highlight ? "inherit" : "text.primary",
                }}
              >
                {result.value}
              </Typography>
            </Box>
          ))}
        </Box>

        {explanation && (
          <Box
            sx={{
              mt: 2,
              p: 2,
              backgroundColor: "info.light",
              borderRadius: 3,
              border: 1,
              borderColor: "info.main",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "flex-start" }}>
              <Box sx={{ mr: 1.5, mt: 0.25 }}>
                <svg
                  style={{ width: 20, height: 20, color: "currentColor" }}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: "text.primary",
                  lineHeight: 1.6,
                }}
              >
                {explanation}
              </Typography>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
