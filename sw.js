const CACHE_NAME = "lemari-v1.0.0";

const APP_SHELL = [
  "/LEMARI/",
  "/LEMARI/index.html",
  "/LEMARI/manifest.json",

  "/LEMARI/assets/logo/favicon-16.png",
  "/LEMARI/assets/logo/favicon-32.png",
  "/LEMARI/assets/logo/favicon-48.png",

  "/LEMARI/assets/pwa/icon-192.png",
  "/LEMARI/assets/pwa/icon-512.png",
  "/LEMARI/assets/pwa/apple-touch-icon.png",

  "/LEMARI/assets/illustrations/empty.png",
  "/LEMARI/assets/illustrations/success.png",
  "/LEMARI/assets/illustrations/error.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(APP_SHELL))
  );

  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys()
      .then(keys =>
        Promise.all(
          keys
            .filter(
              key =>
                key.startsWith("lemari-") &&
                key !== CACHE_NAME
            )
            .map(key => caches.delete(key))
        )
      )
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  // API Worker/CDN jangan dicache.
  if (url.origin !== self.location.origin) {
    return;
  }

  if (!url.pathname.startsWith("/LEMARI/")) {
    return;
  }

  // HTML: network-first.
  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(response => {
          if (response && response.ok) {
            const copy = response.clone();

            caches.open(CACHE_NAME)
              .then(cache =>
                cache.put(
                  "/LEMARI/index.html",
                  copy
                )
              );
          }

          return response;
        })
        .catch(async () =>
          (await caches.match("/LEMARI/index.html")) ||
          (await caches.match("/LEMARI/"))
        )
    );

    return;
  }

  // Asset lokal: cache-first.
  event.respondWith(
    caches.match(request)
      .then(cached => {
        if (cached) {
          return cached;
        }

        return fetch(request)
          .then(response => {
            if (response && response.ok) {
              const copy = response.clone();

              caches.open(CACHE_NAME)
                .then(cache =>
                  cache.put(
                    request,
                    copy
                  )
                );
            }

            return response;
          });
      })
  );
});
