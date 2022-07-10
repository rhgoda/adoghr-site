const cacheName = 'matb-v1';
const cacheFiles = [
    './index.html',
    './styles.css',
    './android/android-launchericon-512-512.png',
    './android/android-launchericon-192-192.png',
    './android/android-launchericon-144-144.png',
    './android/android-launchericon-96-96.png',
    './android/android-launchericon-72-72.png',
    './android/android-launchericon-48-48.png',
    './ios/16.png',
    './ios/20.png',
    './ios/29.png',
    './ios/32.png',
    './ios/40.png',
    './ios/50.png',
    './ios/57.png',
    './ios/58.png',
    './ios/60.png',
    './ios/64.png',
    './ios/72.png',
    './ios/76.png',
    './ios/80.png',
    './ios/87.png',
    './ios/100.png',
    './ios/114.png',
    './ios/120.png',
    './ios/128.png',
    './ios/144.png',
    './ios/152.png',
    './ios/167.png',
    './ios/180.png',
    './ios/192.png',
    './ios/256.png',
    './ios/512.png',
    './ios/1024.png'
]

self.addEventListener('install', (e) => {
    e.waitUntil((async () => {
        const cache = await caches.open(cacheName);
        await cache.addAll(cacheFiles);
    })());
});

self.addEventListener('fetch', (e) => {
    e.respondWith((async () => {
        const r = await caches.match(e.request);
        if (r) return r;
        const response = await fetch(e.request);
        const cache = await caches.open(cacheName);
        cache.put(e.request, response.clone());
        return response;
    })());
});

self.addEventListener('activate', (e) => {
    e.waitUntil(caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
            if (key === cacheName) { return; }
            return caches.delete(key);
        }))
    }));
});