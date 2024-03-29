// message-list.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from '../../message.service';
import { MessageFilterPipe } from '../../pipes/message-filter.pipe';
import { NotificationService } from '../../notification.service';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
  providers: [MessageFilterPipe]
})
export class MessageListComponent implements OnInit {

  messages: any[] = [];
  @Input() loggedPersonId: number = 0;
  @Input() loggedPersonName: string = "";
  @Input() loggedPersonSurname: string = "";



  showTypeStatus = 0;
  searchText: string = '';
  localLenght = 0;
  lastMess: string = "";

  constructor(
    private messageService: MessageService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    setInterval(() => {
      this.refreshMessages();
    }, 5000);

    this.loadMessages();
  }

  loadMessages() {
    this.messageService.getMessages().subscribe(
      (data: any) => {
        const newMessages = data.reverse();
        const nameAndSurname: string = this.loggedPersonName + " " + this.loggedPersonSurname;
        if (newMessages.length > this.localLenght && newMessages[0].senderName!==nameAndSurname && this.lastMess!==newMessages[0].content) {
          this.localLenght = newMessages.length;
          this.lastMess = newMessages[0].content;
          console.log(1);
          console.log(newMessages.length);
          console.log(2);
          console.log(this.localLenght);
          this.messages = newMessages;
          const latestMessage = newMessages[0];
          this.notificationService.showNotification(`Nowa wiadomość od ${latestMessage.senderName}`);
        }
        this.messages = newMessages;
      },
      (error) => {
        console.error('Wystąpił błąd podczas pobierania wiadomości:', error);
      }
    );
  }

  refreshMessages() {
    this.loadMessages();
  }

  showOdebrane(){
    this.showTypeStatus = 0;
    this.refreshMessages();
  }

  showWyslane(){
    this.showTypeStatus = 1
    this.refreshMessages();
  }

  showNapisz(){
    this.showTypeStatus = 3;
  }

  deleteMessage(messageId: number) {
    this.messageService.deleteMessage(messageId).subscribe(
      () => {
        console.log('Wiadomość została usunięta.');
        this.loadMessages();
      },
      (error) => {
        console.error('Wystąpił błąd podczas usuwania wiadomości:', error);
      }
    );
  }

  test(id:number){
    console.log("id wiadomosci");
    console.log(id);
  }
}
