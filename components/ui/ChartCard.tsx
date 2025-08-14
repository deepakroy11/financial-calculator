"use client";

import { Card, CardContent, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

interface ChartCardProps {
  title: string;
  data: any[];
  type: "line" | "pie" | "bar";
  dataKey?: string;
  xAxisKey?: string;
  colors?: string[];
}

const COLORS = ["#1f7a99", "#10b981", "#f59e0b", "#ef4444", "#3b82f6"];

export default function ChartCard({
  title,
  data,
  type,
  dataKey = "value",
  xAxisKey = "name",
  colors = COLORS,
}: ChartCardProps) {
  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisKey} />
              <YAxis />
              <Tooltip
                formatter={(value: any) => [
                  `₹${value.toLocaleString()}`,
                  "Amount",
                ]}
              />
              <Line
                type="monotone"
                dataKey={dataKey}
                stroke="#8884d8"
                strokeWidth={3}
                dot={{ fill: "#8884d8", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={80}
                fill="#8884d8"
                dataKey={dataKey}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={colors[index % colors.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: any) => [
                  `₹${value.toLocaleString()}`,
                  "Amount",
                ]}
              />
            </PieChart>
          </ResponsiveContainer>
        );

      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={xAxisKey} />
              <YAxis />
              <Tooltip
                formatter={(value: any) => [
                  `₹${value.toLocaleString()}`,
                  "Amount",
                ]}
              />
              <Bar dataKey={dataKey} fill="#1f7a99" />
            </BarChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

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
        {renderChart()}
      </CardContent>
    </Card>
  );
}
