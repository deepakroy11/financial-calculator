// Utility functions for PWA detection and handling

export const isPWA = (): boolean => {
  if (typeof window === "undefined") return false;

  // Check if running in standalone mode (PWA)
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    (window.navigator as any).standalone === true ||
    document.referrer.includes("android-app://")
  );
};

export const isMobile = (): boolean => {
  if (typeof window === "undefined") return false;

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

export const isIOS = (): boolean => {
  if (typeof window === "undefined") return false;

  return /iPad|iPhone|iPod/.test(navigator.userAgent);
};

export const isAndroid = (): boolean => {
  if (typeof window === "undefined") return false;

  return /Android/.test(navigator.userAgent);
};

// Handle PWA back button behavior
export const handlePWANavigation = (onBack: () => void) => {
  if (typeof window === "undefined") return;

  // For PWA, prevent the default back behavior and use custom handler
  const handlePopState = (event: PopStateEvent) => {
    event.preventDefault();
    onBack();

    // Push the current state back to prevent actual navigation
    window.history.pushState(
      { page: "calculator" },
      "",
      window.location.pathname + window.location.search
    );
  };

  // Add history entry if none exists
  if (window.history.length <= 1) {
    window.history.pushState({ page: "home" }, "", "/");
    window.history.pushState(
      { page: "calculator" },
      "",
      window.location.pathname + window.location.search
    );
  }

  window.addEventListener("popstate", handlePopState);

  // Return cleanup function
  return () => {
    window.removeEventListener("popstate", handlePopState);
  };
};
