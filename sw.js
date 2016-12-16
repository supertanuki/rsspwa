const APP_CACHE_NAME = 'rsspwa-v1';
const DATA_CACHE_NAME = 'rsspwa-data-v1';

const FILES_TO_CACHE = [
    '/rsspwa/',
    '/rsspwa/index.html',
    '/rsspwa/app.js',
    '/rsspwa/css/bootstrap.min.css',
    '/rsspwa/favicon/android-chrome-192x192.png'
];

self.addEventListener('install', function(event) {
    event.waitUntil(
        caches.open(APP_CACHE_NAME).then(function(cache) {
            console.log('[ServiceWorker] Caching app shell');
            return cache.addAll(FILES_TO_CACHE);
        })
    );
});

self.addEventListener('activate', function(event) {
    console.log('[ServiceWorker] Activate !!!');

    event.waitUntil(
        caches.keys().then(function(keyList) {
            return Promise.all(keyList.map(function(key) {
                if (key !== APP_CACHE_NAME && key !== DATA_CACHE_NAME) {
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );

    return self.clients.claim();
});

self.addEventListener('fetch', function(event) {
    console.log('[Service Worker] Fetch', event.request.url);

    if (event.request.url.indexOf(self.registration.scope) === 0) {
        /*
         * The app is asking for app shell files. In this scenario the app uses the
         * "Cache, falling back to the network" offline strategy:
         * https://jakearchibald.com/2014/offline-cookbook/#cache-falling-back-to-network
         */
        event.respondWith(
            caches.match(event.request).then(function(response) {
                return response || fetch(event.request);
            })
        );
    } else {
        /*
         * When the request URL is not an internal scope, the app is asking for
         * fresh data. In this case, the service worker always goes to the
         * network and then caches the response. This is called the "Cache then
         * network" strategy:
         * https://jakearchibald.com/2014/offline-cookbook/#cache-then-network
         */
        event.respondWith(
            caches.open(DATA_CACHE_NAME).then(function(cache) {
                return fetch(event.request).then(function(response) {
                    cache.put(event.request.url, response.clone());
                    return response;
                });
            })
        );
    }
});
