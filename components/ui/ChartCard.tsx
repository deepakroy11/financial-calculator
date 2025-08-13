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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884d8"];

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
              <Bar dataKey={dataKey} fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <Card
      className="w-full max-w-3xl mx-auto mt-8 shadow-xl border-0"
      sx={{
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        borderRadius: "20px",
      }}
    >
      <CardContent className="p-6">
        <Typography
          variant="h6"
          component="h3"
          className="mb-4 font-bold text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
        >
          {title}
        </Typography>
        {renderChart()}
      </CardContent>
    </Card>
  );
}
