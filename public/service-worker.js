// Set a name for the current cache
var cacheName = "v1";

// Default files to always cache
var cacheFiles = [
  "./index.html",
  "./logo48.png",
  "./logo96.png",
  "./logo192.png",
  "./static/css/main.586dd2d9.css",
  "./static/js/main.1fc1e2a4.js",
  "./static/media/bgcover.4622ad3a.jpg",
  "./static/media/dusha.b2d27c84.ttf",
  "./static/media/roboto-latin-100.987b8457.woff2",
  "./static/media/roboto-latin-100.e9dbbe8a.woff",
  "./static/media/roboto-latin-100italic.6232f43d.woff2",
  "./static/media/roboto-latin-100italic.d704bb3d.woff",
  "./static/media/roboto-latin-300.55536c8e.woff2",
  "./static/media/roboto-latin-300.a1471d1d.woff",
  "./static/media/roboto-latin-300italic.210a7c78.woff",
  "./static/media/roboto-latin-300italic.d69924b9.woff2",
  "./static/media/roboto-latin-400.5d4aeb4e.woff2",
  "./static/media/roboto-latin-400.bafb105b.woff",
  "./static/media/roboto-latin-400italic.9680d5a0.woff",
  "./static/media/roboto-latin-400italic.d8bcbe72.woff2",
  "./static/media/roboto-latin-500.28546717.woff2",
  "./static/media/roboto-latin-500.de8b7431.woff",
  "./static/media/roboto-latin-500italic.510dec37.woff2",
  "./static/media/roboto-latin-500italic.ffcc050b.woff",
  "./static/media/roboto-latin-700.037d8304.woff2",
  "./static/media/roboto-latin-700.cf6613d1.woff",
  "./static/media/roboto-latin-700italic.010c1aee.woff2",
  "./static/media/roboto-latin-700italic.846d1890.woff",
  "./static/media/roboto-latin-900.19b7a0ad.woff2",
  "./static/media/roboto-latin-900.8c2ade50.woff",
  "./static/media/roboto-latin-900italic.7b770d6c.woff2",
  "./static/media/roboto-latin-900italic.bc833e72.woff"
];

self.addEventListener("install", function(e) {
  console.log("[ServiceWorker] Installed");

  // e.waitUntil Delays the event until the Promise is resolved
  e.waitUntil(
    // Open the cache
    caches.open(cacheName).then(function(cache) {
      // Add all the default files to the cache
      console.log("[ServiceWorker] Caching cacheFiles");
      return cache.addAll(cacheFiles);
    })
  ); // end e.waitUntil
});

self.addEventListener("activate", function(e) {
  console.log("[ServiceWorker] Activated");

  e.waitUntil(
    // Get all the cache keys (cacheName)
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(thisCacheName) {
          // If a cached item is saved under a previous cacheName
          if (thisCacheName !== cacheName) {
            // Delete that cached file
            console.log(
              "[ServiceWorker] Removing Cached Files from Cache - ",
              thisCacheName
            );
            return caches.delete(thisCacheName);
          }
        })
      );
    })
  ); // end e.waitUntil
});

self.addEventListener("fetch", function(e) {
  console.log("[ServiceWorker] Fetch", e.request.url);

  // e.respondWidth Responds to the fetch event
  e.respondWith(
    // Check in cache for the request being made
    caches
      .match(e.request)

      .then(function(response) {
        // If the request is in the cache
        if (response) {
          console.log(
            "[ServiceWorker] Found in Cache",
            e.request.url,
            response
          );
          // Return the cached version
          return response;
        }

        // If the request is NOT in the cache, fetch and cache

        var requestClone = e.request.clone();
        fetch(requestClone)
          .then(function(response) {
            if (!response) {
              console.log("[ServiceWorker] No response from fetch ");
              return response;
            }

            var responseClone = response.clone();

            //  Open the cache
            caches.open(cacheName).then(function(cache) {
              // Put the fetched response in the cache
              cache.put(e.request, responseClone);
              console.log("[ServiceWorker] New Data Cached", e.request.url);

              // Return the response
              return response;
            }); // end caches.open
          })
          .catch(function(err) {
            console.log(
              "[ServiceWorker] Error Fetching & Caching New Data",
              err
            );
          });
      }) // end caches.match(e.request)
  ); // end e.respondWith
});
