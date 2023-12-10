import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent implements OnInit{

  selected: string;

  constructor(){
    this.selected = "worker";
  }

  ngOnInit(): void {

  }

  loginWorker(){
    this.selected = "worker";
  }

  loginManager(){
    this.selected = "manager";
  }
}
