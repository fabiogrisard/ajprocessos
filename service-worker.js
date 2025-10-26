const cacheName = 'ajprocessos-cache-v1';
const precacheResources = [
    'index.html',
    'https://raw.githubusercontent.com/fabiogrisard/ajprocessos/refs/heads/main/ajetl-73emu-001.ico',
    'https://raw.githubusercontent.com/fabiogrisard/ajprocessos/refs/heads/main/logoana.jpg',
    'manifest.json'
];

self.addEventListener('install', event => {
    console.log('Service worker install event!');
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(precacheResources);
            })
    );
});

self.addEventListener('activate', event => {
    console.log('Service worker activate event!');
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(cachedResponse => {
                if (cachedResponse) {
                    return cachedResponse;
                }
                return fetch(event.request);
            })
    );
});
