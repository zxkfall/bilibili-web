// public/sw.js
self.addEventListener('install', (event) => {
    console.log('Service Worker installed');
});

self.addEventListener('fetch', (event) => {
    if (event.request.url.includes('/api/video-segment')) {
        event.respondWith(
            caches.match(event.request).then(cachedResponse => {
                // 如果缓存存在，直接返回缓存内容
                if (cachedResponse) {
                    return cachedResponse;
                }
                // 否则从网络请求
                return fetch(event.request).then(response => {
                    // 只缓存成功的响应
                    if (response && response.status === 206) {
                        const responseClone = response.clone();
                        caches.open('video-cache').then(cache => {
                            cache.put(event.request, responseClone);
                        });
                    }
                    return response;
                });
            })
        );
    }
});
