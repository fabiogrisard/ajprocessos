const CACHE_NAME = 'ajprocessos-v1';
const urlsToCache = [
    './',
    './index.html',
    './manifest.json',
    'https://raw.githubusercontent.com/fabiogrisard/ajprocessos/refs/heads/main/logoana.jpg',
    'https://raw.githubusercontent.com/fabiogrisard/ajprocessos/refs/heads/main/ajetl-73emu-001.ico'
];

// Instalar Service Worker
self.addEventListener('install', event => {
    console.log('Service Worker: Instalando...');
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Service Worker: Cache aberto');
                return cache.addAll(urlsToCache);
            })
            .catch(error => {
                console.error('Service Worker: Erro ao cachear:', error);
            })
    );
    self.skipWaiting();
});

// Ativar Service Worker
self.addEventListener('activate', event => {
    console.log('Service Worker: Ativando...');
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Service Worker: Deletando cache antigo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Interceptar requisições
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                return fetch(event.request)
                    .then(response => {
                            return response;
                        }
                        const responseToCache = response.clone();
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        return response;
                    })
                    .catch(() => {
                        return caches.match('./index.html');
                    });
            })
    );
});
