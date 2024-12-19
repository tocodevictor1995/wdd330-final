class NotificationService {
    constructor() {
        this.permission = false;
    }

    async requestPermission() {
        const result = await Notification.requestPermission();
        this.permission = result === 'granted';
    }

    sendNotification(title, body) {
        if (this.permission) {
            new Notification(title, { body });
        }
    }
}
