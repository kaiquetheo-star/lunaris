const CACHE_NAME = 'lunaris-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './logo.png',
  './vibe.mp4',
  './dormindo.mp4',
  './comendo.mp4',
  './chuva.mp3',
  './ronronar.mp3',
  './track1.mp3',
  './track2.mp3',
  './track3.mp3',
  './track4.mp3'
];

// Instalação: Salva os arquivos no cache do celular
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Ativação: Limpa caches antigos se você atualizar o app
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// Intercepta pedidos: Tenta pegar do cache primeiro (muito mais rápido)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});