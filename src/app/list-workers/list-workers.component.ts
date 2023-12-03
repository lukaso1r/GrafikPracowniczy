import { Component, OnInit, numberAttribute } from '@angular/core';
import {WorkersService} from '../workers.service';
import { ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-list-workers',
  templateUrl: './list-workers.component.html',
  styleUrl: './list-workers.component.css'
})
export class ListWorkersComponent implements OnInit{

  foundWorkerToEdit: any;
  editWorkerPopUp: boolean = false;
  editWorkerForm = new FormGroup({imie: new FormControl(''), nazwisko: new FormControl(''), haslo: new FormControl('')});
  succesStateFlag: boolean = false;


  constructor(private worker:WorkersService, private elementRef: ElementRef){
    this.worker.getAllWorkers().subscribe((allData)=>{
      console.log(allData);
      this.workerData = allData;
    });
  }

  workerData: any=[];

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

  editWorker(workerToChangeId: number){
    this.foundWorkerToEdit = this.workerData.find((w: { id: number; }) => w.id === workerToChangeId);
    this.editWorkerForm = new FormGroup({imie: new FormControl(this.foundWorkerToEdit.imie), nazwisko: new FormControl(this.foundWorkerToEdit.nazwisko), haslo: new FormControl(this.foundWorkerToEdit.haslo)});
    this.editWorkerPopUp = true;
    console.log(this.foundWorkerToEdit.id);
  }

  SaveDataEditWorker(){
    this.worker.updateWorkerData(this.foundWorkerToEdit.id, this.editWorkerForm.value).subscribe(
      (result)=>{
        console.log(result);
      }
    )
    this.stopEdit();
    this.succesStateFlag = true;
    this.ngOnInit();
  }

  stopEdit(){
    this.editWorkerPopUp = false
    this.foundWorkerToEdit = null;
  }

}
