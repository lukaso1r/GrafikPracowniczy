import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-worker',
  templateUrl: './login-worker.component.html',
  styleUrl: './login-worker.component.css'
})
export class LoginWorkerComponent implements OnInit{

  loginStatus: boolean = false;

  constructor(){
    this.loginStatus = false;
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.loginStatus = false;

  }

  zalogowano(){
      this.loginStatus = true;
  }

}
