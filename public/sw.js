// Dynamic cache name with timestamp for cache busting
const CACHE_NAME = `finly-calculator-v${Date.now()}`;
const STATIC_CACHE_NAME = "finly-static-v2";

// Only cache static assets, not dynamic content
const staticUrlsToCache = [
  "/manifest.json",
  "/favicon/favicon-32x32.png",
  "/favicon/favicon-16x16.png",
  "/favicon/apple-touch-icon.png",
  "/favicon/android-chrome-192x192.png",
  "/favicon/android-chrome-512x512.png",
  "/logo/new-logo-2.png",
];

// Install event - cache only static resources
self.addEventListener("install", (event) => {
  console.log("Service Worker installing...");
  event.waitUntil(
    caches
      .open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log("Caching static assets");
        return cache.addAll(staticUrlsToCache);
      })
      .then(() => {
        // Force activation of new service worker
        return self.skipWaiting();
      })
  );
});

// Fetch event - network first strategy for dynamic content
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip caching for API calls and dynamic routes
  if (
    request.method !== "GET" ||
    url.pathname.startsWith("/api/") ||
    url.pathname.includes("_next/static") ||
    request.headers.get("cache-control") === "no-cache"
  ) {
    return;
  }

  // Handle navigation requests - always fetch fresh for SPA routing
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request).catch(() => {
        // Fallback to cached version only if network fails
        return caches.match("/") || new Response("Offline", { status: 503 });
      })
    );
    return;
  }

  // For static assets - cache first strategy
  if (staticUrlsToCache.some((url) => request.url.includes(url))) {
    event.respondWith(
      caches.match(request).then((response) => {
        return (
          response ||
          fetch(request).then((fetchResponse) => {
            const responseClone = fetchResponse.clone();
            caches.open(STATIC_CACHE_NAME).then((cache) => {
              cache.put(request, responseClone);
            });
            return fetchResponse;
          })
        );
      })
    );
    return;
  }

  // For all other requests - network first strategy
  event.respondWith(
    fetch(request)
      .then((response) => {
        // Don't cache if response is not ok or is opaque
        if (!response || response.status !== 200 || response.type !== "basic") {
          return response;
        }

        // Clone the response for caching
        const responseToCache = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, responseToCache);
        });

        return response;
      })
      .catch(() => {
        // Fallback to cache only if network fails
        return caches.match(request);
      })
  );
});

// Activate event - clean up old caches and take control immediately
self.addEventListener("activate", (event) => {
  console.log("Service Worker activating...");
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            // Keep only the current static cache and latest dynamic cache
            if (cacheName !== STATIC_CACHE_NAME && cacheName !== CACHE_NAME) {
              console.log("Deleting old cache:", cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        // Take control of all clients immediately
        return self.clients.claim();
      })
  );
});

// Handle service worker updates
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }

  if (event.data && event.data.type === "CLEAR_CACHE") {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            console.log("Clearing cache:", cacheName);
            return caches.delete(cacheName);
          })
        );
      })
    );
  }
});
