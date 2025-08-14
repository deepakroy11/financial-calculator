"use client";

import { useEffect } from "react";
import { useThemeMode } from "../../app/theme";

export default function DarkModeHandler() {
  const { darkMode } = useThemeMode();

  useEffect(() => {
    // Only run on client-side
    if (typeof window !== "undefined") {
      if (darkMode) {
        document.documentElement.setAttribute("data-theme", "dark");
        document.documentElement.classList.add("dark");
        document.body.style.backgroundColor = "#0f172a";
        document.body.style.color = "#f1f5f9";
      } else {
        document.documentElement.removeAttribute("data-theme");
        document.documentElement.classList.remove("dark");
        document.body.style.backgroundColor = "#f8fafc";
        document.body.style.color = "#1e293b";
      }
    }
  }, [darkMode]);

  return null;
}
