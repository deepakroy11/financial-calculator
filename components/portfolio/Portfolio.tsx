"use client";

import { useState } from "react";
import { Box } from "@mui/material";
import PortfolioDashboard from "./PortfolioDashboard";
import PortfolioManager from "./PortfolioManager";
import Header from "../ui/Header";

type ViewMode = "dashboard" | "add" | "edit";

interface EditData {
  category: "investments" | "insurance" | "loans";
  id: string;
}

interface PortfolioProps {
  onNavigateToCalculators?: () => void;
  onNavigateHome?: () => void;
}

export default function Portfolio({
  onNavigateToCalculators,
  onNavigateHome,
}: PortfolioProps = {}) {
  const [viewMode, setViewMode] = useState<ViewMode>("dashboard");
  const [selectedCategory, setSelectedCategory] = useState<
    "investments" | "insurance" | "loans"
  >("investments");
  const [editData, setEditData] = useState<EditData | undefined>();

  const handleAddAsset = (category: "investments" | "insurance" | "loans") => {
    setSelectedCategory(category);
    setEditData(undefined);
    setViewMode("add");
  };

  const handleEditAsset = (
    category: "investments" | "insurance" | "loans",
    id: string
  ) => {
    setSelectedCategory(category);
    setEditData({ category, id });
    setViewMode("edit");
  };

  const handleBackToDashboard = () => {
    setViewMode("dashboard");
    setEditData(undefined);
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "background.default" }}>
      <Header
        onCategorySelect={(categoryId) => {
          if (categoryId === "portfolio") {
            // Already on portfolio, do nothing
            return;
          } else {
            // Navigate to calculators
            onNavigateToCalculators?.();
          }
        }}
        onHomeClick={() => onNavigateHome?.()}
      />

      {viewMode === "dashboard" ? (
        <PortfolioDashboard
          onAddAsset={handleAddAsset}
          onEditAsset={handleEditAsset}
        />
      ) : (
        <PortfolioManager
          onBack={handleBackToDashboard}
          initialTab={selectedCategory}
          editData={editData}
        />
      )}
    </Box>
  );
}
