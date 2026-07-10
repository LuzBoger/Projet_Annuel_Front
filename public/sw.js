self.addEventListener('install', (event) => {
    self.skipWaiting(); 
});

self.addEventListener('activate', (event) => {
    console.log('Activated');
    event.waitUntil(clients.claim()); 
});


self.addEventListener('push', (event) => {
    const data = event.data ? event.data.json() : {title : 'Skaldly', body: 'New Content Available!'};
    event.waitUntil(
        self.registration.showNotification(data.title, {
            body: data.body,
            icon: './sk.svg',
            badge: './sk.svg',
        })
    );
});

self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    event.waitUntil(
        clients.openWindow('/')
    );
});

