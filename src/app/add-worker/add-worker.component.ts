import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms';
import {WorkersService} from '../workers.service';

@Component({
  selector: 'app-add-worker',
  templateUrl: './add-worker.component.html',
  styleUrl: './add-worker.component.css'
})
export class AddWorkerComponent implements OnInit {

  constructor(private worker:WorkersService){

  }

  addWorker = new FormGroup({imie: new FormControl(''), nazwisko: new FormControl(''), haslo: new FormControl('')});

  ngOnInit(): void {

  }

  SaveData(){
    console.log(this.addWorker.value);
    this.worker.saveWorkerData(this.addWorker.value).subscribe((result)=>{
      console.log(result);
    });
  }


}
