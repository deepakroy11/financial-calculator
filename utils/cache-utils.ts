// Cache utilities for better cache management

export const CacheUtils = {
  // Generate cache-busting query parameter
  getCacheBuster(): string {
    return `?v=${Date.now()}`;
  },

  // Clear browser cache programmatically
  async clearBrowserCache(): Promise<void> {
    if ("caches" in window) {
      try {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName))
        );
        console.log("Browser caches cleared");
      } catch (error) {
        console.error("Error clearing browser cache:", error);
      }
    }
  },

  // Force reload without cache
  forceReload(): void {
    if ("location" in window) {
      window.location.reload();
    }
  },

  // Check if running in development
  isDevelopment(): boolean {
    return process.env.NODE_ENV === "development";
  },

  // Add cache-busting to URLs in development
  addCacheBuster(url: string): string {
    if (this.isDevelopment()) {
      const separator = url.includes("?") ? "&" : "?";
      return `${url}${separator}v=${Date.now()}`;
    }
    return url;
  },

  // Storage utilities with cache invalidation
  storage: {
    set(key: string, value: any, ttl?: number): void {
      const item = {
        value,
        timestamp: Date.now(),
        ttl: ttl || 0,
      };
      localStorage.setItem(key, JSON.stringify(item));
    },

    get(key: string): any {
      try {
        const item = localStorage.getItem(key);
        if (!item) return null;

        const parsed = JSON.parse(item);

        // Check if item has expired
        if (parsed.ttl > 0 && Date.now() - parsed.timestamp > parsed.ttl) {
          localStorage.removeItem(key);
          return null;
        }

        return parsed.value;
      } catch (error) {
        console.error("Error reading from storage:", error);
        return null;
      }
    },

    remove(key: string): void {
      localStorage.removeItem(key);
    },

    clear(): void {
      localStorage.clear();
    },
  },
};

// Development helper functions
if (typeof window !== "undefined" && CacheUtils.isDevelopment()) {
  // Add global cache utilities for debugging
  (window as any).cacheUtils = CacheUtils;

  // Log cache status
  console.log(
    "🔧 Development mode: Cache utilities available at window.cacheUtils"
  );
}
