import { Component, OnInit, numberAttribute } from '@angular/core';
import {WorkersService} from '../workers.service'


@Component({
  selector: 'app-list-workers',
  templateUrl: './list-workers.component.html',
  styleUrl: './list-workers.component.css'
})
export class ListWorkersComponent implements OnInit{

  constructor(private worker:WorkersService){

  }

  workerData:any=[];

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.worker.getAllWorkers().subscribe((allData)=>{
      console.log(allData);
      this.workerData = allData;
    });
  }

  deleteWorker(workerId: number){
    let foundWorker = this.workerData.find((w: { id: number; }) => w.id === workerId);
    alert("usnięto: " + foundWorker.imie + " "+ foundWorker.nazwisko + " o id: " + workerId);
    console.log(this.workerData);
    this.worker.deleteWorker(workerId).subscribe((result) => {
      console.log(result);
      this.ngOnInit();
    });
  }

}
