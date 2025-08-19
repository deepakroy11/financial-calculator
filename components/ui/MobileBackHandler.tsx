"use client";

import { useEffect } from "react";
import { Fab, useTheme } from "@mui/material";
import { FaArrowLeft } from "react-icons/fa";

interface MobileBackHandlerProps {
  onBack: () => void;
  show: boolean;
}

export default function MobileBackHandler({
  onBack,
  show,
}: MobileBackHandlerProps) {
  const theme = useTheme();

  useEffect(() => {
    if (!show) return;

    // Handle Android back button for PWA
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.keyCode === 27) {
        onBack();
      }
    };

    // Handle browser back button
    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      onBack();
      // Push state back to prevent actual navigation
      window.history.pushState(null, "", window.location.href);
    };

    // Add event listeners
    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("popstate", handlePopState);

    // Push initial state to create history entry
    window.history.pushState(null, "", window.location.href);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [show, onBack]);

  if (!show) return null;

  return (
    <Fab
      onClick={onBack}
      sx={{
        position: "fixed",
        bottom: 24,
        left: 24,
        zIndex: 1000,
        backgroundColor: theme.palette.primary.main,
        color: "white",
        boxShadow: "0 4px 12px rgba(31, 122, 153, 0.3)",
        "&:hover": {
          backgroundColor: theme.palette.primary.dark,
          transform: "scale(1.1)",
        },
        transition: "all 0.2s ease-in-out",
        display: { xs: "flex", sm: "none" }, // Only show on mobile
      }}
      size="medium"
    >
      <FaArrowLeft size={20} />
    </Fab>
  );
}
