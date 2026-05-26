self.addEventListener('push', (event) => {
    console.log('[SW] Push received', event.data?.text());
    const data = event.data ? event.data.json() : {title : 'Skaldly', body: 'New Content Available!'};
    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: './vite.svg',
            badge: './vite.svg',
        })
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});

