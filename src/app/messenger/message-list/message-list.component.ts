// message-list.component.ts

import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../message.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css']
})
export class MessageListComponent implements OnInit {

  messages: any[] = [];

  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService.getMessages().subscribe(
      (data: any) => {
        this.messages = data;
      },
      (error) => {
        console.error('Wystąpił błąd podczas pobierania wiadomości:', error);
      }
    );
  }
}
