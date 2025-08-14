"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { CustomThemeProvider } from "./theme";
import DarkModeHandler from "../components/ui/DarkModeHandler";

export default function ClientThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CustomThemeProvider>
      <CssBaseline />
      <DarkModeHandler />
      {children}
    </CustomThemeProvider>
  );
}
