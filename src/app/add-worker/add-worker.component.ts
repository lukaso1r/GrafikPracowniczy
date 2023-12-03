import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {WorkersService} from '../workers.service';

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

  addWorker = new FormGroup({imie: new FormControl(''), nazwisko: new FormControl(''), haslo: new FormControl('')});

  ngOnInit(): void {

  }

  SaveData(){
    console.log(this.addWorker.value);
    if (!this.addWorker.value.imie || !this.addWorker.value.nazwisko || !this.addWorker.value.haslo) {
      alert("Puste pole");
      return; // Przerwij wykonywanie funkcji, jeśli pole jest puste
    }else{
      this.worker.saveWorkerData(this.addWorker.value).subscribe((result)=>{
      console.log(result);
      this.succesStateFlag = true;
      this.addWorker.reset({});
    });
    }

  }


}
