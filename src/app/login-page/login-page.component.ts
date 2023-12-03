import { Component } from '@angular/core';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  
  selected: string;

  constructor(){
    this.selected = "worker";
  }

  ngOnInit(): void {
    this.selected = "wokrker";
  }

  loginWorker(){
    this.selected = "worker";
  }

  loginManager(){
    this.selected = "manager";
  }
}
