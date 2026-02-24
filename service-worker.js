const CACHE_NAME = 'lunaris-echoes-v3-final'; // Mudei o nome para forçar atualização

// Lista EXATA de arquivos que o jogo precisa para rodar
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './script.js',
  './manifest.json',
  './logo.png',
  './quarto_bg.png',
  './spritesheet.png', // O arquivo mais importante agora!
  './click.mp3',
  './ronronar.mp3',
  './chuva.mp3',
  './track1.mp3',
  './track2.mp3',
  './track3.mp3',
  './track4.mp3'
];

// 1. INSTALAÇÃO: Baixa tudo para o cofre do celular
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Instalando e cacheando assets...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
  self.skipWaiting(); // Força o SW a ativar imediatamente
});

// 2. ATIVAÇÃO: Limpa os caches velhos (Faxina)
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Ativando e limpando caches antigos...');
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Removendo cache antigo:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim(); // Assume o controle da página na hora
});

// 3. INTERCEPTAÇÃO: Serve o arquivo do cache se tiver, senão busca na rede
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Se achou no cache, retorna ele (Rápido!)
      if (cachedResponse) {
        return cachedResponse;
      }
      // Se não, busca na internet
      return fetch(event.request);
    })
  );
});