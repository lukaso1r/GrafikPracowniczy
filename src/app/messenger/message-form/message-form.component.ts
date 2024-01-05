// message-form.component.ts

import { Component, Input, ViewChild } from '@angular/core';
import { MessageService } from '../../message.service';
import {WorkersService} from '../../workers.service';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

@Component({
  selector: 'app-message-form',
  templateUrl: './message-form.component.html',
  styleUrls: ['./message-form.component.css']
})
export class MessageFormComponent {

  @Input() loggedPersonId: number = 0;
  @Input() loggedPersonName: string = "";
  @Input() loggedPersonSurname: string = "";

  @ViewChild('messageForm') messageForm!: NgForm; // Dodaj ViewChild do referencji do formularza


  fullName: string = "";
  content: string = '';
  allData: any = null;
  allManagers:any = null;

  succesStateFlag: boolean;



  constructor(private messageService: MessageService, private worker:WorkersService) {
    this.loadWorkers();
    this.loadManagers();
    this.succesStateFlag = false;
  }

  async loadWorkers() {
    this.allData = await this.worker.getAllWorkers().toPromise();
    console.log(this.allData);

    // Znajdź indeks aktualnie zalogowanego użytkownika w danych pracowników
    let indexOfLoggedUser = this.allData.findIndex(
      (worker: any) =>
        worker.imie === this.loggedPersonName && worker.nazwisko === this.loggedPersonSurname
    );

    // Jeśli aktualnie zalogowany użytkownik został znaleziony, usuń go z listy pracowników
    if (indexOfLoggedUser !== -1) {
      this.allData.splice(indexOfLoggedUser, 1);
    }
  }


  async loadManagers(){
    this.allManagers = await this.worker.getAllManagers().toPromise();
    console.log(this.allManagers);

    // Znajdź indeks aktualnie zalogowanego użytkownika w danych pracowników
    let indexOfLoggedUser = this.allManagers.findIndex(
      (manager: any) =>
      manager.imie === this.loggedPersonName && manager.nazwisko === this.loggedPersonSurname
    );

    // Jeśli aktualnie zalogowany użytkownik został znaleziony, usuń go z listy pracowników
    if (indexOfLoggedUser !== -1) {
      this.allManagers.splice(indexOfLoggedUser, 1);
    }
  }

  sendMessage() {
    // Sprawdź, czy treść wiadomości nie jest pusta, aby uniknąć wysłania pustych wiadomości.
    if (this.content.trim() !== '') {
      this.messageService.sendMessage(this.loggedPersonId, this.loggedPersonName + " " + this.loggedPersonSurname, 2, this.fullName, this.content).subscribe(
        (data: any) => {
          console.log('Wiadomość została wysłana:', data);
          this.succesStateFlag = true;

          // Wyczyść formularz po udanym wysłaniu wiadomości
          this.resetForm();

          // Opcjonalnie możesz tutaj dodać dodatkową logikę obsługi, np. zaktualizowanie listy wiadomości.
        },
        (error) => {
          console.error('Wystąpił błąd podczas wysyłania wiadomości:', error);
        }
      );
    } else {
      console.warn('Nie można wysłać pustej wiadomości.');
    }
  }

  resetForm() {
    // Wyczyść wartości formularza
    this.fullName = '';
    this.content = '';

    // Skorzystaj z ngForm.reset() aby również zresetować stan formularza
    if (this.messageForm) {
      this.messageForm.reset();
    }
  }

  test(){
    console.log(this.fullName);
    console.log(this.content);
  }
}
