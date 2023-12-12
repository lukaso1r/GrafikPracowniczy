import { Component, OnInit, numberAttribute } from '@angular/core';
import {WorkersService} from '../workers.service';
import { ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WorkerClass } from '../model/WorkerClass';
import { ShiftClass } from '../model/ShiftClass';
import {capitalizedFirstLettersValidator} from '../validators/capitalizedFirstLettersValidator';


@Component({
  selector: 'app-list-workers',
  templateUrl: './list-workers.component.html',
  styleUrl: './list-workers.component.css',
})
export class ListWorkersComponent implements OnInit{

  foundWorkerToEdit: any;
  editWorkerPopUp: boolean = false;
  editWorkerForm = new FormGroup({
    imie: new FormControl(''),
    nazwisko: new FormControl(''),
     email: new FormControl(''),
     haslo: new FormControl(''),
     ulica: new FormControl(''),
     numerDomu: new FormControl(''),
     miasto: new FormControl(''),
     kodPocztowy: new FormControl(''),
     numerTelefonu: new FormControl(''),
     stanowidkoId: new FormControl(''),
     dzialId: new FormControl('')
  });
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
    this.editWorkerForm = new FormGroup({
      imie: new FormControl(this.foundWorkerToEdit.imie, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        capitalizedFirstLettersValidator()
      ]),
      nazwisko: new FormControl(this.foundWorkerToEdit.nazwisko, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        capitalizedFirstLettersValidator()
      ]),
       email: new FormControl(this.foundWorkerToEdit.email, [
        Validators.required,
        Validators.pattern('[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+'),
      ]),
       haslo: new FormControl(this.foundWorkerToEdit.haslo, [
        Validators.required,
        Validators.minLength(8),
      ]),
       ulica: new FormControl(this.foundWorkerToEdit.ulica, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        capitalizedFirstLettersValidator()
      ]),
       numerDomu: new FormControl(this.foundWorkerToEdit.numerDomu, [
        Validators.required,
        Validators.min(0),
        Validators.max(9999)
      ]),
       miasto: new FormControl(this.foundWorkerToEdit.miasto, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        capitalizedFirstLettersValidator()
      ]),
       kodPocztowy: new FormControl(this.foundWorkerToEdit.kodPocztowy, [
        Validators.required,
        Validators.pattern('[0-9][0-9]-[0-9][0-9][0-9]')
      ]),
       numerTelefonu: new FormControl(this.foundWorkerToEdit.numerTelefonu, [
        Validators.required,
        Validators.min(100000000),
        Validators.max(999999999)
      ]),
       stanowidkoId: new FormControl(this.foundWorkerToEdit.stanowiskoId, [
        Validators.min(0),
        Validators.max(9999),
      ]),
       dzialId: new FormControl(this.foundWorkerToEdit.dzialId, [
        Validators.min(0),
        Validators.max(9999),
      ])
    });
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
