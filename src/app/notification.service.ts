import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  showNotification(message: string): void {
    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('Nowa wiadomość', { body: message });
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification('Nowa wiadomość', { body: message });
          }
        });
      }
    }
  }

}
