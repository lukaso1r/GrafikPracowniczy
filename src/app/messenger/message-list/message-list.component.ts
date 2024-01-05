// message-list.component.ts
import { Component, OnInit, Input } from '@angular/core';
import { MessageService } from '../../message.service';
import { MessageFilterPipe } from '../../pipes/message-filter.pipe'; // Import customowego Pipe

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.component.html',
  styleUrls: ['./message-list.component.css'],
  providers: [MessageFilterPipe] // Dodaj Pipe do dostępnych providerów
})
export class MessageListComponent implements OnInit {

  messages: any[] = [];
  @Input() loggedPersonId: number = 2;
  @Input() loggedPersonName: string = "";
  @Input() loggedPersonSurname: string = "";

  showTypeStatus = 0;

  searchText: string = '';



  constructor(private messageService: MessageService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages() {
    this.messageService.getMessages().subscribe(
      (data: any) => {
        this.messages = data.reverse(); // Odwróć listę przed przypisaniem do zmiennej.
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
        // Opcjonalnie możesz tutaj zaktualizować listę wiadomości po usunięciu.
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
