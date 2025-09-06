// Cache management utility for development
class CacheManager {
  constructor() {
    this.isServiceWorkerSupported = "serviceWorker" in navigator;
    this.isDevelopment = process.env.NODE_ENV === "development";
  }

  // Clear all caches
  async clearAllCaches() {
    if (!this.isServiceWorkerSupported) {
      console.log("Service Worker not supported");
      return;
    }

    try {
      // Clear all caches
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((cacheName) => {
          console.log("Clearing cache:", cacheName);
          return caches.delete(cacheName);
        })
      );

      // Unregister service worker
      const registrations = await navigator.serviceWorker.getRegistrations();
      await Promise.all(
        registrations.map((registration) => {
          console.log("Unregistering service worker");
          return registration.unregister();
        })
      );

      console.log("All caches cleared and service worker unregistered");

      // Reload the page to get fresh content
      window.location.reload(true);
    } catch (error) {
      console.error("Error clearing caches:", error);
    }
  }

  // Update service worker
  async updateServiceWorker() {
    if (!this.isServiceWorkerSupported) {
      return;
    }

    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        await registration.update();

        // If there's a waiting service worker, activate it
        if (registration.waiting) {
          registration.waiting.postMessage({ type: "SKIP_WAITING" });
        }
      }
    } catch (error) {
      console.error("Error updating service worker:", error);
    }
  }

  // Check for service worker updates
  async checkForUpdates() {
    if (!this.isServiceWorkerSupported) {
      return;
    }

    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                // New service worker is available
                console.log("New service worker available");
                if (confirm("New version available! Reload to update?")) {
                  newWorker.postMessage({ type: "SKIP_WAITING" });
                  window.location.reload();
                }
              }
            });
          }
        });
      }
    } catch (error) {
      console.error("Error checking for updates:", error);
    }
  }

  // Initialize cache manager
  init() {
    if (this.isDevelopment) {
      // Add cache clearing button in development
      this.addDevControls();
    }

    // Check for updates periodically
    this.checkForUpdates();
    setInterval(() => this.checkForUpdates(), 60000); // Check every minute
  }

  // Add development controls
  addDevControls() {
    // Create a floating button for cache management
    const button = document.createElement("button");
    button.innerHTML = "🗑️ Clear Cache";
    button.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 9999;
      background: #ff4444;
      color: white;
      border: none;
      padding: 10px 15px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 12px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.3);
    `;

    button.addEventListener("click", () => this.clearAllCaches());
    document.body.appendChild(button);

    // Add keyboard shortcut (Ctrl+Shift+R)
    document.addEventListener("keydown", (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "R") {
        e.preventDefault();
        this.clearAllCaches();
      }
    });
  }
}

// Auto-initialize if in browser
if (typeof window !== "undefined") {
  const cacheManager = new CacheManager();

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => cacheManager.init());
  } else {
    cacheManager.init();
  }

  // Make it globally available
  window.cacheManager = cacheManager;
}
