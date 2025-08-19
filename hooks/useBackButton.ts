"use client";

import { useEffect } from "react";

interface UseBackButtonProps {
  onBack: () => void;
  enabled?: boolean;
}

export const useBackButton = ({
  onBack,
  enabled = true,
}: UseBackButtonProps) => {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") return;

    // Add a history entry when component mounts
    // This ensures there's always something to go back to
    if (window.history.length <= 1) {
      window.history.pushState({ page: "home" }, "Financial Calculators", "/");
      window.history.pushState(
        { page: "calculator" },
        "",
        window.location.pathname + window.location.search
      );
    }

    const handlePopState = (event: PopStateEvent) => {
      // Only handle browser back button, not programmatic navigation
      if (event.state && event.state.programmatic) {
        return; // Let programmatic navigation proceed normally
      }

      // Prevent default browser behavior for hardware back button
      event.preventDefault();

      // Call our custom back handler
      onBack();

      // Push the current state back to prevent browser from actually going back
      window.history.pushState(
        { page: "calculator" },
        "",
        window.location.pathname + window.location.search
      );
    };

    // Listen for back button presses
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [onBack, enabled]);

  // Function to programmatically trigger back navigation
  const goBack = () => {
    onBack();
  };

  return { goBack };
};

// Alternative approach for PWA - prevent app from closing
export const usePreventAppClose = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // For PWA, add a beforeunload listener to prevent accidental closing
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      // Only show confirmation if user is on a calculator page
      const isOnCalculator =
        window.location.pathname !== "/" &&
        window.location.search.includes("calculator") === false;

      if (isOnCalculator) {
        event.preventDefault();
        event.returnValue =
          "Are you sure you want to leave? Your calculation data will be lost.";
        return event.returnValue;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
};
