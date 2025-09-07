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
      main: "#FCA311",
      light: "#FCA311",
      dark: "#14213D",
    },
    secondary: {
      main: "#14213D",
      light: "#E5E5E5",
      dark: "#000000",
    },
    background: {
      default: "#E5E5E5" /* Light gray background */,
      paper: "#ffffff",
    },
  },
});

export const CustomThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [darkMode, setDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Only access localStorage after component mounts (client-side)
    if (typeof window !== "undefined") {
      const savedMode = localStorage.getItem("darkMode");
      if (savedMode) {
        setDarkMode(JSON.parse(savedMode));
      } else {
        // Default to dark mode if no preference is saved
        setDarkMode(true);
        localStorage.setItem("darkMode", JSON.stringify(true));
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

  // Prevent hydration mismatch by using consistent theme during SSR
  if (!mounted) {
    return (
      <ThemeContext.Provider
        value={{ darkMode: true, toggleDarkMode: () => {} }}
      >
        <ThemeProvider theme={createTheme({ palette: { mode: "dark" } })}>
          {children}
        </ThemeProvider>
      </ThemeContext.Provider>
    );
  }

  // Create theme dynamically based on darkMode
  const dynamicTheme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#FCA311", // Vibrant orange
        light: "#FCA311", // Vibrant orange
        dark: "#14213D", // Dark navy blue
        contrastText: "#ffffff",
      },
      secondary: {
        main: "#14213D", // Dark navy blue
        light: "#E5E5E5", // Light gray
        dark: "#000000", // Pure black
        contrastText: "#E5E5E5",
      },
      background: {
        default: darkMode
          ? "#0f172a" /* Slate-900 for better contrast */
          : "#fefcf7" /* Warm white for light theme */,
        paper: darkMode
          ? "#1e293b"
          : "#ffffff" /* Slate-800 for dark, pure white for light */,
      },
      text: {
        primary: darkMode
          ? "#f1f5f9"
          : "#1e293b" /* Slate-100 for dark, slate-800 for light */,
        secondary: darkMode
          ? "#94a3b8"
          : "#64748b" /* Slate-400 for dark, slate-500 for light */,
      },
      success: {
        main: "#FCA311",
        light: "#FCA311",
        dark: "#14213D",
      },
      warning: {
        main: "#FCA311",
        light: "#FCA311",
        dark: "#14213D",
      },
      error: {
        main: "#ef4444",
        light: "#f87171",
        dark: "#dc2626",
      },
      info: {
        main: "#FCA311",
        light: "#FCA311",
        dark: "#14213D",
      },
      divider: darkMode
        ? "#334155"
        : "#e2e8f0" /* Slate-700 for dark, slate-200 for light */,
    },
    typography: {
      fontFamily: "Quicksand, sans-serif",
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
              ? "0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)"
              : "0 1px 3px 0 rgba(0, 0, 0, 0.08), 0 1px 2px 0 rgba(0, 0, 0, 0.04)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              boxShadow: darkMode
                ? "0 0 0 2px rgba(252, 163, 17, 0.3), 0 0 30px rgba(252, 163, 17, 0.4), 0 20px 25px -5px rgba(0, 0, 0, 0.5)"
                : "0 0 0 2px rgba(252, 163, 17, 0.2), 0 0 20px rgba(252, 163, 17, 0.3), 0 10px 15px -3px rgba(0, 0, 0, 0.1)",
              borderColor: darkMode
                ? "rgba(252, 163, 17, 0.4)"
                : "rgba(252, 163, 17, 0.3)",
              background: darkMode
                ? "linear-gradient(135deg, #14213D, rgba(252, 163, 17, 0.08))"
                : "linear-gradient(135deg, #ffffff, rgba(252, 163, 17, 0.05))",
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
              boxShadow:
                "0 0 0 2px rgba(252, 163, 17, 0.2), 0 0 20px rgba(252, 163, 17, 0.3), 0 4px 12px rgba(252, 163, 17, 0.3)",
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
                borderWidth: "1px",
                borderColor: darkMode ? "#334155" : "#e2e8f0",
              },
              "&:hover fieldset": {
                borderColor: darkMode ? "#475569" : "#cbd5e1",
              },
              "&.Mui-focused fieldset": {
                borderColor: "#FCA311",
                borderWidth: "2px",
              },
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: darkMode
              ? "rgba(15, 23, 42, 0.95)"
              : "rgba(255, 255, 255, 0.95)",
            color: darkMode ? "#f1f5f9" : "#1e293b",
            boxShadow: darkMode
              ? "0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)"
              : "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)",
            borderBottom: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}`,
            backdropFilter: "blur(20px)",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: darkMode
              ? "rgba(30, 41, 59, 0.95)"
              : "rgba(255, 255, 255, 0.95)",
            borderLeft: `1px solid ${darkMode ? "#334155" : "#e2e8f0"}`,
            backdropFilter: "blur(20px)",
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
