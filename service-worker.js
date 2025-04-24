self.addEventListener('install', (e) => {
  console.log('Service Worker: Установлен');
  e.waitUntil(
    caches.open('my-cache').then((cache) => {
      return cache.addAll([
        'index.html',
        'manifest.json'
      ]);
    })
  );
});

self.addEventListener('fetch', (e) => {
  console.log('Service Worker: Обработка запроса', e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
