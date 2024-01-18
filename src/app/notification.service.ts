import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  showNotification(message: string): void {
    // Sprawdź, czy przeglądarka obsługuje powiadomienia
    if ('Notification' in window) {
      // Sprawdź, czy użytkownik zezwolił na otrzymywanie powiadomień
      if (Notification.permission === 'granted') {
        // Twórz nowe powiadomienie
        new Notification('Nowa wiadomość', { body: message });
      } else if (Notification.permission !== 'denied') {
        // Poproś użytkownika o zezwolenie na otrzymywanie powiadomień
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification('Nowa wiadomość', { body: message });
          }
        });
      }
    }
  }

}
