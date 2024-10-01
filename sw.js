self.addEventListener('notificationclick', function(event) {
    event.notification.close();

    if (event.action === 'toggleLight') {
        // Handle the logic for toggling the light here
        console.log('Light toggled via notification');
        // You can send messages to the page or update the database
        event.waitUntil(
            self.clients.matchAll().then(clients => {
                if (clients && clients.length) {
                    clients[0].postMessage({ action: 'toggleLight' });
                }
            })
        );
    } else if (event.action === 'toggleFan') {
        // Handle the logic for toggling the fan here
        console.log('Fan toggled via notification');
        event.waitUntil(
            self.clients.matchAll().then(clients => {
                if (clients && clients.length) {
                    clients[0].postMessage({ action: 'toggleFan' });
                }
            })
        );
    } else {
        console.log('Notification clicked');
    }
});

self.addEventListener('message', function(event) {
    console.log('Service Worker received message:', event.data);
});
