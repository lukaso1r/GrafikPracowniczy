import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit{

  selected: string;
  loggedStatus: boolean;

  constructor(){
    this.selected = "worker";
    this.loggedStatus = false;
  }

  ngOnInit(): void {
  
  }



  loginWorker(){
    this.selected = "worker";
  }

  loginManager(){
    this.selected = "manager";
  }

  handleLoggedStatusChange(status: boolean) {
    this.loggedStatus = status;
  }

  test(){
    console.log(this.loggedStatus);
    console.log("zajebala mi skalaadaka");
  }
}
