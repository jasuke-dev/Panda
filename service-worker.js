const CACHE_NAME = "panda-v2";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/pages/home.html",
  "/pages/profile.html",
  "/pages/funfact.html",
  "/pages/gallery.html",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/main.js",
  "/css/style.css",
  "/img/icons-512.png",
  "/img/icons-192.png",
  "/img/panda1.jpg",
  "/img/panda2.jpg",
  "/img/panda3.jpg",
  "/img/panda4.jpg",
  "/img/panda5.jpg",
  "/img/panda6.jpg",
  "/img/bambu.jpg",
  "/img/panda-baby.jpg",
  "/manifest.json"
];
 
self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
      caches
        .match(event.request, { cacheName: CACHE_NAME })
        .then(function(response) {
          if (response) {
            console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
            return response;
          }
   
          console.log(
            "ServiceWorker: Memuat aset dari server: ",
            event.request.url
          );
          return fetch(event.request);
        })
    );
  });

  self.addEventListener("activate", function(event) {
    event.waitUntil(
      caches.keys().then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName != CACHE_NAME) {
              console.log("ServiceWorker: cache " + cacheName + " dihapus");
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });
