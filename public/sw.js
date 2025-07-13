// Cache name (unique for HealthifyLive)
const CACHE_NAME = 'healthifylive-cache-v1';

// Files to cache (based on your exact structure)
const urlsToCache = [
  '/',
  '/index.html',
  '/call-back.html',
  '/booking.html',
  '/cart.html',
  '/contact.html',
  '/my-bookings.html',
  '/styles/style.css',
  '/scripts/cart-ui.js',
  '/scripts/drawer.js',
  '/scripts/firebase-auth.js',
  '/scripts/lead-submission.js',
  '/scripts/search.js',
  '/public/Tests.json',
  '/public/Profiles.json',
  '/public/icons/icon-192x192.png',
  '/public/icons/icon-512x512.png'
];

// Install event: Cache files when the PWA is installed
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching files');
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event: Serve cached files or fetch from network
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        // Fallback to index.html for offline navigation
        return caches.match('/index.html');
      });
    })
  );
});

// Activate event: Clean up old caches
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
