const PING_INTERVAL = 600000;

self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(self.clients.claim());
  setInterval(() => {
    fetch("/api/healthz").catch(() => {});
  }, PING_INTERVAL);
});
