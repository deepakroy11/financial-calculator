"use client";

import { useState, useEffect } from "react";
import { Button, Snackbar, Alert, Box } from "@mui/material";
import { FaDownload, FaTimes } from "react-icons/fa";

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Show the install prompt
      setShowInstallPrompt(true);
    };

    const handleAppInstalled = () => {
      console.log("PWA was installed");
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    };

    // Check if app is already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }

    // Clear the deferredPrompt
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Hide for this session
    sessionStorage.setItem("pwa-prompt-dismissed", "true");
  };

  // Don't show if already installed or dismissed this session
  if (isInstalled || sessionStorage.getItem("pwa-prompt-dismissed")) {
    return null;
  }

  return (
    <Snackbar
      open={showInstallPrompt && !!deferredPrompt}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      sx={{ mb: 2 }}
    >
      <Alert
        severity="info"
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          "& .MuiAlert-icon": {
            color: "white",
          },
          minWidth: "300px",
        }}
        action={
          <Box sx={{ display: "flex", gap: 1 }}>
            <Button
              size="small"
              onClick={handleInstallClick}
              startIcon={<FaDownload />}
              sx={{
                color: "white",
                borderColor: "white",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  borderColor: "white",
                },
              }}
              variant="outlined"
            >
              Install
            </Button>
            <Button
              size="small"
              onClick={handleDismiss}
              sx={{
                color: "white",
                minWidth: "auto",
                p: 0.5,
              }}
            >
              <FaTimes />
            </Button>
          </Box>
        }
      >
        Install Finly as an app for quick access!
      </Alert>
    </Snackbar>
  );
}
