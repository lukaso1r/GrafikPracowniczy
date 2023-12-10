import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {WorkersService} from '../workers.service';
import {capitalizedFirstLettersValidator} from '../validators/capitalizedFirstLettersValidator';

@Component({
  selector: 'app-add-worker',
  templateUrl: './add-worker.component.html',
  styleUrl: './add-worker.component.css'
})
export class AddWorkerComponent implements OnInit {

  succesStateFlag: boolean;

  constructor(private worker:WorkersService){
    this.succesStateFlag = false;
  }

  addWorker = new FormGroup({
    imie: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50),
      capitalizedFirstLettersValidator()
    ]),
    nazwisko: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
      capitalizedFirstLettersValidator()
    ]),
     email: new FormControl('', [
      Validators.required,
      Validators.pattern('[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+'),
    ]),
     haslo: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
     ulica: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
      capitalizedFirstLettersValidator()
    ]),
     numerDomu: new FormControl('', [
      Validators.required,
      Validators.min(0),
      Validators.max(9999)
    ]),
     miasto: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(100),
      capitalizedFirstLettersValidator()
    ]),
     kodPocztowy: new FormControl('', [
      Validators.required,
      Validators.pattern('[0-9][0-9]-[0-9][0-9][0-9]')
    ]),
     numerTelefonu: new FormControl('', [
      Validators.required,
      Validators.min(100000000),
      Validators.max(999999999)
    ]),
     stanowidkoId: new FormControl('', [
      Validators.min(0),
      Validators.max(9999),
    ]),
     dzialId: new FormControl('', [
      Validators.min(0),
      Validators.max(9999),
    ])
  });

  ngOnInit(): void {

  }

  SaveData(){
    console.log(this.addWorker.value);
    this.worker.saveWorkerData(this.addWorker.value).subscribe((result)=>{
    console.log(result);
    this.succesStateFlag = true;
    this.addWorker.reset({});
    });
  }
}



