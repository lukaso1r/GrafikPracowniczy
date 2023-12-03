import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-manager',
  templateUrl: './login-manager.component.html',
  styleUrl: './login-manager.component.css'
})
export class LoginManagerComponent implements OnInit{

  loginStatus: boolean = false;
  showWorkerListStatus: boolean = false;

  constructor(){
    this.loginStatus = false;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loginStatus = false;
    this.showWorkerListStatus = false;

  }

  zalogowano(){
      this.loginStatus = true;
  }

  changeShowWorkersListStatus(){
    this.showWorkerListStatus = true;
  }

}
