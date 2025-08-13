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
      className="w-full mt-6 shadow-lg border border-gray-200"
      sx={{
        borderRadius: "16px",
        background: "white",
      }}
    >
      <CardContent className="p-6">
        <Typography
          variant="h6"
          component="h3"
          className="mb-4 font-bold text-gray-800"
        >
          {title}
        </Typography>

        <div className="space-y-3">
          {results.map((result, index) => (
            <Box
              key={index}
              className={`flex justify-between items-center p-4 rounded-xl transition-all duration-200 ${
                result.highlight
                  ? "bg-blue-50 border-2 border-blue-200"
                  : "bg-gray-50 border border-gray-200"
              }`}
            >
              <Typography
                variant="body1"
                className="font-semibold text-gray-700"
              >
                {result.label}
              </Typography>
              <Typography
                variant="h6"
                className={`font-bold ${
                  result.highlight ? "text-blue-600" : "text-gray-800"
                }`}
              >
                {result.value}
              </Typography>
            </Box>
          ))}
        </div>

        {explanation && (
          <Box className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-200">
            <div className="flex items-start">
              <div className="mr-3 mt-0.5">
                <svg
                  className="w-5 h-5 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <Typography
                variant="body2"
                className="text-gray-700 leading-relaxed"
              >
                {explanation}
              </Typography>
            </div>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
