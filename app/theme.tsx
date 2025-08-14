"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Theme context for dark mode
interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  darkMode: false,
  toggleDarkMode: () => {},
});

export const useThemeMode = () => useContext(ThemeContext);

// Legacy theme export (light mode base)
export const theme = createTheme({
  palette: {
    primary: {
      main: "#1f7a99",
      light: "#4a9bb8",
      dark: "#155a73",
    },
    secondary: {
      main: "#f59e0b",
      light: "#fbbf24",
      dark: "#d97706",
    },
    background: {
      default: "#fefcf7" /* Warm cream background */,
      paper: "#ffffff",
    },
  },
});

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [darkMode, setDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Only access localStorage after component mounts (client-side)
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("darkMode");
      if (savedMode) {
        setDarkMode(JSON.parse(savedMode));
      }
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    // Only access localStorage if we're in the browser
    if (typeof window !== "undefined") {
      localStorage.setItem("darkMode", JSON.stringify(newMode));
    }
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <ThemeContext.Provider
        value={{ darkMode: false, toggleDarkMode: () => {} }}
      >
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ThemeContext.Provider>
    );
  }

  // Create theme dynamically based on darkMode
  const dynamicTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#1f7a99",
        light: "#4a9bb8",
        dark: "#155a73",
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#f59e0b",
        light: "#fbbf24",
        dark: "#d97706",
        contrastText: "#ffffff",
      },
      background: {
        default: darkMode
          ? "#0f172a"
          : "#fefcf7" /* Warm cream for light theme */,
        paper: darkMode ? "#1e293b" : "#ffffff",
      },
      text: {
        primary: darkMode ? "#f1f5f9" : "#1e293b",
        secondary: darkMode ? "#cbd5e1" : "#64748b",
      },
      success: {
        main: "#10b981",
        light: "#34d399",
        dark: "#059669",
      },
      warning: {
        main: "#f59e0b",
        light: "#fbbf24",
        dark: "#d97706",
      },
      error: {
        main: "#ef4444",
        light: "#f87171",
        dark: "#dc2626",
      },
      info: {
        main: "#3b82f6",
        light: "#60a5fa",
        dark: "#2563eb",
      },
      divider: darkMode ? "#334155" : "#e2e8f0",
    },
    typography: {
      fontFamily: "Inter, sans-serif",
      h1: { fontWeight: 700, fontSize: "2.5rem" },
      h2: { fontWeight: 600, fontSize: "2rem" },
      h3: { fontWeight: 600, fontSize: "1.75rem" },
      h4: { fontWeight: 600, fontSize: "1.5rem" },
      h5: { fontWeight: 600, fontSize: "1.25rem" },
      h6: { fontWeight: 500, fontSize: "1.125rem" },
      body1: { fontSize: "1rem", lineHeight: 1.6 },
      body2: { fontSize: "0.875rem", lineHeight: 1.5 },
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            border: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}`,
            backgroundColor: darkMode ? "#1e293b" : "#ffffff",
            boxShadow: darkMode
              ? "0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)"
              : "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: darkMode
                ? "0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)"
                : "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            textTransform: "none",
            fontWeight: 500,
            padding: "12px 24px",
            transition: "all 0.2s ease-in-out",
            "&:hover": {
              transform: "translateY(-1px)",
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              borderRadius: 12,
              backgroundColor: darkMode ? "#1e293b" : "#ffffff",
              "& fieldset": {
                borderWidth: "2px",
                borderColor: darkMode ? "#334155" : "#e2e8f0",
              },
              "&:hover fieldset": {
                borderColor: "#4a9bb8",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#1f7a99",
              },
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode ? "#1e293b" : "#ffffff",
            color: darkMode ? "#f1f5f9" : "#1e293b",
            boxShadow: "none",
            borderBottom: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}`,
            backdropFilter: "blur(8px)",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: darkMode ? "#1e293b" : "#ffffff",
            borderLeft: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}`,
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <ThemeProvider theme={dynamicTheme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
