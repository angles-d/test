const cacheName = "worker";

// Installing Service Worker
self.addEventListener("install", (e) => {
  console.log("[Service Worker] Install");
  e.waitUntil(
    (async () => {
      const cache = await caches.open(cacheName);
      console.log("[Service Worker] Caching all: app shell and content");
      // await cache.addAll(contentToCache);
    })()
  );
});

// Fetching content using Service Worker
self.addEventListener("fetch", (e) => {
  // Cache http and https only, skip unsupported chrome-extension:// and file://...
  if (
    !(e.request.url.startsWith("http:") || e.request.url.startsWith("https:"))
  ) {
    return;
  }

  e.respondWith(
    (async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) return r;
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })()
  );
});

registration.periodicSync.register("background-test", {
  minInterval: 1000 * 10,
});

self.addEventListener("periodicsync", (event) => {
  if (event.tag === "background-test") {
    console.log("SYNCED");
    Notification.requestPermission().then((result) => {
      if (result === "granted") {
        navigator.serviceWorker.ready.then((registration) => {
          self.registration.showNotification("Wake Time !!!", {
            body: `Hi, Good Morning`,
          });
        });
      }
    });
  }
});
