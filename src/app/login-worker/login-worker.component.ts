import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WorkersService } from '../workers.service';

@Component({
  selector: 'app-login-worker',
  templateUrl: './login-worker.component.html',
  styleUrl: './login-worker.component.css'
})
export class LoginWorkerComponent implements OnInit{

  loginStatus: boolean = false;
  loginAsWorker = new FormGroup({imie: new FormControl(''), nazwisko: new FormControl(''), haslo: new FormControl('')});
  loggedWorkerInfo: string = "";
  workersData: any=[];
  showShiftList: boolean;

  outPutActiveList: boolean[];

  constructor(private worker:WorkersService){
    this.showShiftList = false;
    this.outPutActiveList = [
      this.showShiftList
    ];
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.worker.getAllWorkers().subscribe((allWorkers)=>{
      console.log(allWorkers);
      this.workersData = allWorkers;
    });
  }

  loginAsWorkerFunc(){
    console.log(this.loginAsWorker.value);
    let ifWorkerExist = this.workersData.some((obj: { imie: string; nazwisko: string; haslo: string;}) =>
      obj.imie === this.loginAsWorker.value.imie && obj.nazwisko === this.loginAsWorker.value.nazwisko && obj.haslo === this.loginAsWorker.value.haslo
    );
    if(ifWorkerExist){
      this.loginStatus = true;
      this.loggedWorkerInfo = this.loginAsWorker.value.imie + " " + this.loginAsWorker.value.nazwisko ;
      this.loginAsWorker.reset({});
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

  wylogowano(){
      this.loginStatus = false;
  }

}
