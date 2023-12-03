import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-manager',
  templateUrl: './login-manager.component.html',
  styleUrl: './login-manager.component.css'
})
export class LoginManagerComponent implements OnInit{

  loginStatus: boolean;
  showWorkerListStatus: boolean;
  showAddWorkerStatus: boolean;
  showCalencdarStatus: boolean;

  outPutActiveList: boolean[];

  constructor(){

    this.loginStatus = false;
    this.showWorkerListStatus = false;
    this.showAddWorkerStatus = false;
    this.showCalencdarStatus = false;

    this.outPutActiveList = [
      this.showWorkerListStatus,
      this.showAddWorkerStatus,
      this.showCalencdarStatus
    ];
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.loginStatus = false;
    this.showWorkerListStatus = false;
    this.showAddWorkerStatus = false;
    this.showCalencdarStatus = false;

    this.outPutActiveList = [
      this.showWorkerListStatus,
      this.showAddWorkerStatus,
      this.showCalencdarStatus
    ];

  }

  zalogowano(){
      this.loginStatus = true;
  }

  changeShowWorkersListStatus(){
    this.showWorkerListStatus = true;
  }

  changeOutPutActiveList(buttonId: string){
    //ustawienie wszystkich elementów jako off
    this.outPutActiveList = this.outPutActiveList.map(() => false);

    // ustawienie elementu pobranego z przycisku na true
    const index = this.outPutActiveList.findIndex((element, idx) => idx === +buttonId);
    if (index !== -1) {
      this.outPutActiveList[index] = true;
    }
    console.log(this.outPutActiveList)

  }

  wyglogowano(){
    this.loginStatus = false;
    //ustawienie wszystkich elementów jako off
    this.outPutActiveList = this.outPutActiveList.map(() => false);
  }

}
