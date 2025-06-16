self.addEventListener("install", event => {
    event.waitUntil(
      caches.open("calc-cache").then(cache =>
        cache.addAll([
          "index.html",
          "styles.css",
          "script.js",
          "logo.png",
          "manifest.json"
        ])
      )
    );
  });
  
  self.addEventListener("fetch", event => {
    event.respondWith(
      caches.match(event.request).then(res => res || fetch(event.request))
    );
  });
  