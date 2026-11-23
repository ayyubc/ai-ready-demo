const CACHE = "ai-ready-03243e3d";
const PRECACHE = [
 "./",
 "./fonts/albert-sans-latin-400-normal.woff2",
 "./fonts/albert-sans-latin-500-normal.woff2",
 "./fonts/albert-sans-latin-600-normal.woff2",
 "./fonts/albert-sans-latin-700-normal.woff2",
 "./fonts/rethink-sans-latin-500-normal.woff2",
 "./fonts/rethink-sans-latin-700-normal.woff2",
 "./fonts/rethink-sans-latin-800-normal.woff2",
 "./icons/icon-192.png",
 "./icons/icon-512-maskable.png",
 "./icons/icon-512.png",
 "./index.html",
 "./manifest.webmanifest"
];
self.addEventListener("install", e => e.waitUntil(caches.open(CACHE).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting())));
self.addEventListener("activate", e => e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith("ai-ready-") && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())));
self.addEventListener("fetch", e => { const r = e.request; if (r.method !== "GET" || new URL(r.url).origin !== self.location.origin) return; e.respondWith(caches.match(r, { ignoreSearch: true }).then(hit => hit || fetch(r).catch(() => r.mode === "navigate" ? caches.match("./index.html") : Response.error()))); });
