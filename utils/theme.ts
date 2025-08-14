// Theme utility functions
export const getThemeColors = (darkMode: boolean) => ({
  primary: "#1f7a99",
  primaryLight: "#4a9bb8",
  primaryDark: "#155a73",
  secondary: "#f59e0b",
  success: "#10b981",
  error: "#ef4444",
  warning: "#f59e0b",
  info: "#3b82f6",
  background: {
    primary: darkMode ? "#0f172a" : "#f8fafc",
    secondary: darkMode ? "#1e293b" : "#ffffff",
    tertiary: darkMode ? "#334155" : "#f1f5f9",
  },
  text: {
    primary: darkMode ? "#f1f5f9" : "#1e293b",
    secondary: darkMode ? "#cbd5e1" : "#64748b",
  },
  border: darkMode ? "#334155" : "#e2e8f0",
});

export const getCategoryColor = (categoryId: string): string => {
  const colors: Record<string, string> = {
    loans: "#1f7a99",
    investments: "#10b981",
    taxes: "#ef4444",
    savings: "#4a9bb8",
    business: "#f59e0b",
  };
  return colors[categoryId] || "#1f7a99";
};
