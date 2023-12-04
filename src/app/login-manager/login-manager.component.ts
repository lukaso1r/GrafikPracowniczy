import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {WorkersService} from '../workers.service';

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

  constructor(private manager:WorkersService){

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

  loginAsManager = new FormGroup({imie: new FormControl(''), nazwisko: new FormControl(''), haslo: new FormControl('')});
  managersData: any=[];
  loggedManagerInfo: string = "";

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

    this.manager.getAllManagers().subscribe((allManagers)=>{
      console.log(allManagers);
      this.managersData = allManagers;
    });

  }

  loginAsManagerFunc(){
    console.log(this.loginAsManager.value);
    let ifManagerExist = this.managersData.some((obj: { imie: string; nazwisko: string; haslo: string; }) =>
      obj.imie === this.loginAsManager.value.imie && obj.nazwisko === this.loginAsManager.value.nazwisko && obj.haslo === this.loginAsManager.value.haslo
    );
    if(ifManagerExist){
      this.loginStatus = true;
      this.loggedManagerInfo = this.loginAsManager.value.imie + " " + this.loginAsManager.value.nazwisko ;
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
    //ustawienie wszystkich elementów jako off
    this.outPutActiveList = this.outPutActiveList.map(() => false);
  }

}
