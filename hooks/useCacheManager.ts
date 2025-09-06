import { useEffect } from "react";
import { CacheUtils } from "../utils/cache-utils";

export const useCacheManager = () => {
  useEffect(() => {
    // Only in development mode
    if (!CacheUtils.isDevelopment()) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+Shift+R or Cmd+Shift+R for cache clear and reload
      if (
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        event.key === "R"
      ) {
        event.preventDefault();

        console.log("🗑️ Clearing all caches and reloading...");

        // Clear all caches
        CacheUtils.clearBrowserCache().then(() => {
          // Clear service worker caches
          if ("serviceWorker" in navigator) {
            navigator.serviceWorker.getRegistration().then((registration) => {
              if (registration && registration.active) {
                registration.active.postMessage({ type: "CLEAR_CACHE" });
              }
            });
          }

          // Clear local storage
          CacheUtils.storage.clear();

          // Force reload
          setTimeout(() => {
            CacheUtils.forceReload();
          }, 500);
        });
      }

      // Ctrl+Shift+U or Cmd+Shift+U for service worker update
      if (
        (event.ctrlKey || event.metaKey) &&
        event.shiftKey &&
        event.key === "U"
      ) {
        event.preventDefault();

        console.log("🔄 Updating service worker...");

        if ("serviceWorker" in navigator) {
          navigator.serviceWorker.getRegistration().then((registration) => {
            if (registration) {
              registration.update().then(() => {
                console.log("Service worker updated");
              });
            }
          });
        }
      }
    };

    // Add event listener
    document.addEventListener("keydown", handleKeyDown);

    // Cleanup
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return {
    clearCache: CacheUtils.clearBrowserCache,
    forceReload: CacheUtils.forceReload,
    isDevelopment: CacheUtils.isDevelopment(),
  };
};
