import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {WorkersService} from '../workers.service';
import { NodeService } from './../node-service.service';


@Component({
  selector: 'app-login-manager',
  templateUrl: './login-manager.component.html',
  styleUrl: './login-manager.component.css'
})
export class LoginManagerComponent implements OnInit{

  loginStatus: boolean = false;
  currentTime: string = "";
  // Informacje o zalogowanej osobie
  loggedPersonId = 0;
  loggedPersonName= "testImie";
  loggedPersonSurname = "testNazwisko";

  loggedStatus: boolean = false;
  @Output() loggedStatusChange = new EventEmitter<boolean>();

  messeage = "wiadomosc";

  showWorkerListStatus: boolean;
  showAddWorkerStatus: boolean;
  showCalencdarStatus: boolean;
  showMessageStatus: boolean;

  outPutActiveList: boolean[];

  constructor(private manager:WorkersService, private NodeService: NodeService){


    this.showWorkerListStatus = false;
    this.showAddWorkerStatus = false;
    this.showCalencdarStatus = false;
    this.showMessageStatus = true;

    this.outPutActiveList = [
      this.showWorkerListStatus,
      this.showAddWorkerStatus,
      this.showCalencdarStatus,
      this.showMessageStatus
    ];
  }

  loginAsManager = new FormGroup({imie: new FormControl(''), nazwisko: new FormControl(''), haslo: new FormControl('')});
  addShift = new FormGroup({id: new FormControl(''), date: new FormControl(''), worker: new FormControl('')});
  managersData: any=[];
  loggedManagerInfo: string = "";

  ngOnInit(): void {



    this.showWorkerListStatus = false;
    this.showAddWorkerStatus = false;
    this.showCalencdarStatus = false;
    this.showMessageStatus = true;

    this.outPutActiveList = [
      this.showWorkerListStatus,
      this.showAddWorkerStatus,
      this.showCalencdarStatus,
      this.showMessageStatus
    ];

    this.manager.getAllManagers().subscribe((allManagers)=>{
      console.log(allManagers);
      this.managersData = allManagers;
    });

    this.getCurrentTime();
    // setInterval(() => {
    //   this.getCurrentTime();
    // }, 1000);

  }

  getCurrentTime() {
    this.NodeService.getCurrentTime().subscribe(
      (data: any) => {
        this.currentTime  = data.time;
      },
      (error) => {
        console.error('Błąd pobierania aktualnego czasu', error);
      }
    );
  }

  loginAsManagerFunc(){
    console.log(this.loginAsManager.value);
    let ifManagerExist = this.managersData.some((obj: { imie: string; nazwisko: string; haslo: string; }) =>
      obj.imie === this.loginAsManager.value.imie && obj.nazwisko === this.loginAsManager.value.nazwisko && obj.haslo === this.loginAsManager.value.haslo
    );
    if(ifManagerExist){
      this.loginStatus = true;

      //Przypisanie danych do obecnie zalogowanej osoby
      let foundManager = this.managersData.find((obj: { imie: string; nazwisko: string; haslo: string; }) =>
        obj.imie === this.loginAsManager.value.imie && obj.nazwisko === this.loginAsManager.value.nazwisko && obj.haslo === this.loginAsManager.value.haslo
      );
      this.loggedManagerInfo = this.loginAsManager.value.imie + " " + this.loginAsManager.value.nazwisko;

      this.loggedPersonId = foundManager.id;
      this.loggedPersonName = foundManager.imie as string;
      this.loggedPersonSurname = foundManager.nazwisko as string;

      this.loggedStatusChange.emit(true);


      this.loginAsManager.reset({});
    }else{
      alert("Podano złe dane");
    }
  }



  changeOutPutActiveList(buttonId: string){
    //ustawienie wszystkich elementów jako off
    this.outPutActiveList = this.outPutActiveList.map(() => false);

    // ustawienie elementu pobranego z przycisku na true
    const index = this.outPutActiveList.findIndex((element, idx) => idx === +buttonId);
    if (index !== -1) {
      this.outPutActiveList[index] = true;
    }
    console.log(this.outPutActiveList);

  }

  wyglogowano(){
    this.loginStatus = false;
    this.loggedStatusChange.emit(false);
    console.log(this.loggedStatus);
    //ustawienie wszystkich elementów jako off
    this.outPutActiveList = this.outPutActiveList.map(() => false);
  }

}
