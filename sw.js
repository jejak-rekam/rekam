// Jejak service worker: hanya menyimpan file tampilan. Permintaan ke Google Gemini tidak pernah disimpan.
const VERSI = 'jejak-v23';
const FILE = ['./', './index.html', './stylesheet.css?v=1.5.4', './javascript.js?v=1.5.4', './manifest.webmanifest', './ippo.webp', './ippo-doa.webp', './ippo-alkitab.webp', './ippo-meeting.webp', './ippo-kelas.webp', './ippo-lainnya.webp', './wa.svg', './icon-180.png', './icon-192.png', './icon-512.png', './icon-maskable.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSI).then(c => c.addAll(FILE)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSI).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method === 'POST' && u.origin === location.origin && u.pathname.endsWith('/bagikan')) { // rekaman dari tombol Bagikan Android
    e.respondWith((async () => {
      try { const f = (await e.request.formData()).getAll('rekaman').find(x => x && x.size);
        if (f) await (await caches.open('jejak-bagikan')).put(new URL('./bagikan-file', self.registration.scope).href, new Response(f, { headers: { 'content-type': f.type || 'application/octet-stream', 'x-nama': encodeURIComponent(f.name || 'rekaman') } }));
      } catch (x) {}
      return Response.redirect(new URL('./?dibagikan=1', self.registration.scope).href, 303);
    })());
    return;
  }
  if (e.request.method !== 'GET' || u.origin !== location.origin) return; // Gemini & font: langsung ke internet
  e.respondWith(
    fetch(e.request).then(r => { if (r.ok) { const k = r.clone(); caches.open(VERSI).then(c => c.put(e.request, k)); } return r; })
      .catch(() => caches.match(e.request).then(r => r || (e.request.mode === 'navigate' ? caches.match('./index.html') : Response.error())))
  );
});
