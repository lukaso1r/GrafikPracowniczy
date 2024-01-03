// message-form.component.ts

import { Component, Input } from '@angular/core';
import { MessageService } from '../../message.service';
import {WorkersService} from '../../workers.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent {

  @Input() loggedPersonId: number = 0;
  @Input() loggedPersonName: string = "";
  @Input() loggedPersonSurname: string = "";



  fullName: string = "";
  content: string = '';
  allData: any = null;

  succesStateFlag: boolean;



  constructor(private messageService: MessageService, private worker:WorkersService) {
    this.loadWorkers();
    this.succesStateFlag = false;
  }

  async loadWorkers(){
    this.allData = await this.worker.getAllWorkers().toPromise();
    console.log(this.allData);
  }

  sendMessage() {
    // Sprawdź, czy treść wiadomości nie jest pusta, aby uniknąć wysłania pustych wiadomości.
    if (this.content.trim() !== '') {
      this.messageService.sendMessage(this.loggedPersonId, this.loggedPersonName + " " + this.loggedPersonSurname, 2, this.fullName, this.content).subscribe(
        (data: any) => {
          console.log('Wiadomość została wysłana:', data);
          this.succesStateFlag = true;
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

  test(){
    // this.loadWorkers();
    // for (const data of this.allData) {
    //   console.log(data.imie);
    // }
    console.log(this.fullName);
    console.log(this.content);
  }
}
