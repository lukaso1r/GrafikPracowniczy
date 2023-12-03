import { Component, OnInit } from '@angular/core';
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

}
