"use client";

import { useState, useEffect } from "react";
import { Box, Button, Typography, Alert, Snackbar } from "@mui/material";
import { CacheUtils } from "../utils/cache-utils";

export default function DevCacheManager() {
  const [isVisible, setIsVisible] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    // Only show in development
    setIsVisible(CacheUtils.isDevelopment());
  }, []);

  const handleClearCache = async () => {
    try {
      await CacheUtils.clearBrowserCache();

      // Clear service worker caches
      if ("serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration && registration.active) {
          registration.active.postMessage({ type: "CLEAR_CACHE" });
        }
      }

      // Clear local storage
      CacheUtils.storage.clear();

      setAlertMessage("All caches cleared successfully!");
      setShowAlert(true);

      // Reload after a short delay
      setTimeout(() => {
        CacheUtils.forceReload();
      }, 1000);
    } catch (error) {
      console.error("Error clearing cache:", error);
      setAlertMessage("Error clearing cache. Check console for details.");
      setShowAlert(true);
    }
  };

  const handleUpdateServiceWorker = async () => {
    try {
      if ("serviceWorker" in navigator) {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          await registration.update();
          setAlertMessage("Service worker updated!");
          setShowAlert(true);
        }
      }
    } catch (error) {
      console.error("Error updating service worker:", error);
      setAlertMessage("Error updating service worker.");
      setShowAlert(true);
    }
  };

  if (!isVisible) {
    return null;
  }

  return (
    <>
      <Box
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          zIndex: 9999,
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          color: "white",
          padding: 2,
          borderRadius: 2,
          minWidth: 200,
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
        }}
      >
        <Typography variant="caption" sx={{ display: "block", mb: 1 }}>
          🔧 Dev Tools
        </Typography>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          <Button
            size="small"
            variant="contained"
            color="error"
            onClick={handleClearCache}
            sx={{ fontSize: "0.7rem" }}
          >
            🗑️ Clear All Cache
          </Button>

          <Button
            size="small"
            variant="contained"
            color="warning"
            onClick={handleUpdateServiceWorker}
            sx={{ fontSize: "0.7rem" }}
          >
            🔄 Update SW
          </Button>

          <Button
            size="small"
            variant="contained"
            color="info"
            onClick={() => CacheUtils.forceReload()}
            sx={{ fontSize: "0.7rem" }}
          >
            ⚡ Force Reload
          </Button>
        </Box>

        <Typography
          variant="caption"
          sx={{ display: "block", mt: 1, opacity: 0.7 }}
        >
          Ctrl+Shift+R: Clear & Reload
        </Typography>
      </Box>

      <Snackbar
        open={showAlert}
        autoHideDuration={3000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setShowAlert(false)}
          severity={alertMessage.includes("Error") ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </>
  );
}
