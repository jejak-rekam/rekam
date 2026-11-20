// Jejak service worker: hanya menyimpan file tampilan. Permintaan ke Google Gemini tidak pernah disimpan.
const VERSI = 'jejak-v1';
const FILE = ['./', './index.html', './stylesheet.css', './javascript.js', './manifest.webmanifest', './img/ippo.webp', './img/icon-180.png', './img/icon-192.png', './img/icon-512.png', './img/icon-maskable.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSI).then(c => c.addAll(FILE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSI).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== location.origin) return; // Gemini & font: langsung ke internet
  e.respondWith(
    fetch(e.request).then(r => { if (r.ok) { const k = r.clone(); caches.open(VERSI).then(c => c.put(e.request, k)); } return r; })
      .catch(() => caches.match(e.request).then(r => r || (e.request.mode === 'navigate' ? caches.match('./index.html') : Response.error())))
  );
});
