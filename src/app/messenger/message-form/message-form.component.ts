// message-form.component.ts

import { Component } from '@angular/core';
import { MessageService } from '../../message.service';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent {

  senderId: number = 1; // Identyfikator zalogowanego pracownika (do dostosowania)
  receiverId: number = 20; // Identyfikator odbiorcy (do dostosowania)
  content: string = '';

  constructor(private messageService: MessageService) { }

  sendMessage() {
    // Sprawdź, czy treść wiadomości nie jest pusta, aby uniknąć wysłania pustych wiadomości.
    if (this.content.trim() !== '') {
      this.messageService.sendMessage(this.senderId, "NataliaTest", this.receiverId, "LukaszTest", this.content).subscribe(
        (data: any) => {
          console.log('Wiadomość została wysłana:', data);
          // Opcjonalnie możesz tutaj dodać logikę obsługi, np. wyczyszczenie formularza lub zaktualizowanie listy wiadomości.
        },
        (error) => {
          console.error('Wystąpił błąd podczas wysyłania wiadomości:', error);
        }
      );
    } else {
      console.warn('Nie można wysłać pustej wiadomości.');
    }
  }
}
