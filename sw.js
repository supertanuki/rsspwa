const APP_CACHE_NAME = 'rsspwa-app-v1';
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
    console.log('[ServiceWorker] fetch ' + event.request.url);

    event.respondWith(
        caches
            .match(event.request)
            .catch(function() {
                return fetch(event.request)
                    .then(function(response) {
                        console.log(response);

                        return caches.open(DATA_CACHE_NAME)
                            .then(function(cache) {
                                cache.put(event.request, response.clone());

                                console.log(response);
                                return response;
                            });
                    });
            })
    );
});
