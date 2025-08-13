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
      className="w-full max-w-3xl mx-auto mt-8 shadow-2xl border-0"
      sx={{
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "20px",
      }}
    >
      <CardContent className="p-8">
        <div className="text-center mb-6">
          <Typography
            variant="h5"
            component="h3"
            className="font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent"
          >
            {title}
          </Typography>
        </div>

        <div className="space-y-4">
          {results.map((result, index) => (
            <Box
              key={index}
              className={`flex justify-between items-center p-5 rounded-2xl transition-all duration-200 hover:scale-105 ${
                result.highlight
                  ? "bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 shadow-lg"
                  : "bg-white/70 border border-gray-200 shadow-md"
              }`}
            >
              <Typography variant="h6" className="font-semibold text-gray-700">
                {result.label}
              </Typography>
              <Typography
                variant="h5"
                className={`font-bold ${
                  result.highlight
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
                    : "text-gray-800"
                }`}
              >
                {result.value}
              </Typography>
            </Box>
          ))}
        </div>

        {explanation && (
          <Box className="mt-6 p-5 bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl border border-gray-200">
            <div className="flex items-start">
              <div className="mr-3 mt-1">
                <svg
                  className="w-5 h-5 text-blue-500"
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
                variant="body1"
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
