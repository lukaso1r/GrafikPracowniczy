import { Component, OnInit, numberAttribute } from '@angular/core';
import {WorkersService} from '../workers.service';
import { ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { WorkerClass } from '../model/WorkerClass';
import { ShiftClass } from '../model/ShiftClass';

@Component({
  selector: 'app-list-workers',
  templateUrl: './list-workers.component.html',
  styleUrl: './list-workers.component.css',
})
export class ListWorkersComponent implements OnInit{

  foundWorkerToEdit: any;
  editWorkerPopUp: boolean = false;
  editWorkerForm = new FormGroup({imie: new FormControl(''), nazwisko: new FormControl(''), haslo: new FormControl('')});
  succesStateFlag: boolean = false;
  workerObjectToChangeId: number = 0;
  searchValue:string='';

  workerData: any=[];
  workerObjectList: WorkerClass[] = [];


  constructor(private worker:WorkersService, private elementRef: ElementRef){
    this.initializeData();
  }

  async initializeData(): Promise<void> {
    const allData = await this.worker.getAllWorkers().toPromise();
    console.log(allData);
    this.workerData = allData;

    // Przetwórz dane i utwórz obiekty WorkerClass
    this.workerObjectList = this.workerData.map((workerDataItem: any) => {
      return new WorkerClass(
        workerDataItem.id,
        workerDataItem.haslo,
        workerDataItem.imie,
        workerDataItem.nazwisko,
        workerDataItem.ulica,
        workerDataItem.numerDomu,
        workerDataItem.miasto,
        workerDataItem.kodPocztowy,
        workerDataItem.numerTelefonu,
        workerDataItem.email,
        workerDataItem.stanowiskoId,
        workerDataItem.dzialID,
        new ShiftClass(69)
      );
    });
  }


  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

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
    this.workerObjectToChangeId = workerToChangeId;
  }

  SaveDataEditWorker(){
    //zmiana w json server
    this.worker.updateWorkerData(this.foundWorkerToEdit.id, this.editWorkerForm.value).subscribe(
      (result)=>{
        console.log(result);
      }
    )
    //zmiana obiektu
    let workerObjectToChange = this.workerObjectList.findIndex(worker => worker.Id === this.workerObjectToChangeId);
    //workers[indexWorkerBartek].nazwisko = 'Ruch'; tu ma to być z formularza this.editWorkerForm.value
    this.workerObjectList[workerObjectToChange].Imie = this.editWorkerForm.value.imie as string;
    this.workerObjectList[workerObjectToChange].Nazwisko = this.editWorkerForm.value.nazwisko as string;
    this.workerObjectList[workerObjectToChange].Haslo = this.editWorkerForm.value.haslo as string;
    //koniec edycji w obiekcie

    this.stopEdit();
    this.succesStateFlag = true;
    this.ngOnInit();
  }

  stopEdit(){
    this.editWorkerPopUp = false;
    this.foundWorkerToEdit = null;
    this.workerObjectToChangeId = 0;
  }

  //test
  testFunction(){
    console.log(this.editWorkerForm.value);
    console.log(this.editWorkerForm.value.haslo)
  }


}
