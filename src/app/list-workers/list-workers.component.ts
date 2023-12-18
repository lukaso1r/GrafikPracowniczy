import { Component, OnInit, numberAttribute } from '@angular/core';
import {WorkersService} from '../workers.service';
import { ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WorkerClass } from '../model/WorkerClass';
import {capitalizedFirstLettersValidator} from '../validators/capitalizedFirstLettersValidator';
import { DaneService } from '../dane.service';


@Component({
  selector: 'app-list-workers',
  templateUrl: './list-workers.component.html',
  styleUrl: './list-workers.component.css',
})
export class ListWorkersComponent implements OnInit{

    foundWorkerToEdit: any;
    workerObjectToChange: any;
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

  constructor(private worker:WorkersService, private elementRef: ElementRef, private data: DaneService){
    this.initializeData();
  }

  async initializeData(): Promise<void> {
    this.data.currentWorkerObjectList.subscribe(workerObjectList => this.workerObjectList = workerObjectList);
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
        workerDataItem.dzialID
      );
    });
    this.newWorkerObjectList()
  }

  ngOnInit(): void {
    this.data.currentWorkerObjectList.subscribe(workerObjectList => this.workerObjectList = workerObjectList);
    this.newWorkerObjectList()
  }

  deleteWorker(workerId: number){
    let foundWorker = this.workerData.find((w: { id: number; }) => w.id === workerId);
    alert("usnięto: " + foundWorker.imie + " "+ foundWorker.nazwisko + " o id: " + workerId);
    console.log(this.workerData);
    let index = this.workerObjectList.findIndex((worker: WorkerClass) => worker.Id === workerId);
    if (index !== -1) {
        this.workerObjectList.splice(index, 1);
    }
    this.worker.deleteWorker(workerId).subscribe((result) => {
      console.log(result);
    });
    this.newWorkerObjectList()
  }

  editWorker(workerToChangeId: number){
    this.foundWorkerToEdit = this.workerData.find((w: { id: number; }) => w.id === workerToChangeId);
    this.workerObjectToChange = this.workerObjectList.find((worker: WorkerClass) => worker.Id === workerToChangeId);

    this.editWorkerForm = new FormGroup({
      imie: new FormControl(this.workerObjectToChange.Imie, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        capitalizedFirstLettersValidator()
      ]),
      nazwisko: new FormControl(this.workerObjectToChange.Nazwisko, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        capitalizedFirstLettersValidator()
      ]),
       email: new FormControl(this.workerObjectToChange.Email, [
        Validators.required,
        Validators.pattern('[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z0-9]+'),
      ]),
       haslo: new FormControl(this.workerObjectToChange.Haslo, [
        Validators.required,
        Validators.minLength(8),
      ]),
       ulica: new FormControl(this.workerObjectToChange.Ulica, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        capitalizedFirstLettersValidator()
      ]),
       numerDomu: new FormControl(this.workerObjectToChange.NumerDomu, [
        Validators.required,
        Validators.min(0),
        Validators.max(9999)
      ]),
       miasto: new FormControl(this.workerObjectToChange.Miasto, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100),
        capitalizedFirstLettersValidator()
      ]),
       kodPocztowy: new FormControl(this.workerObjectToChange.KodPocztowy, [
        Validators.required,
        Validators.pattern('[0-9][0-9]-[0-9][0-9][0-9]')
      ]),
       numerTelefonu: new FormControl(this.workerObjectToChange.NumerTelefonu, [
        Validators.required,
        Validators.min(100000000),
        Validators.max(999999999)
      ]),
       stanowidkoId: new FormControl(this.workerObjectToChange.StanowiskoId, [
        Validators.min(0),
        Validators.max(9999),
      ]),
       dzialId: new FormControl(this.workerObjectToChange.DzialId, [
        Validators.min(0),
        Validators.max(9999),
      ])
    });
    this.editWorkerPopUp = true;
    console.log(this.foundWorkerToEdit.id);
    this.workerObjectToChangeId = workerToChangeId;
    this.newWorkerObjectList()
  }

  SaveDataEditWorker(){
    this.worker.updateWorkerData(this.foundWorkerToEdit.id, this.editWorkerForm.value).subscribe(
      (result)=>{
        console.log(result);
      }
    )

    let workerObjectToChange = this.workerObjectList.findIndex(worker => worker.Id === this.workerObjectToChangeId);
    this.workerObjectList[workerObjectToChange].Imie = this.editWorkerForm.value.imie as string;
    this.workerObjectList[workerObjectToChange].Nazwisko = this.editWorkerForm.value.nazwisko as string;
    this.workerObjectList[workerObjectToChange].Email = this.editWorkerForm.value.email as string;
    this.workerObjectList[workerObjectToChange].Haslo = this.editWorkerForm.value.haslo as string;
    this.workerObjectList[workerObjectToChange].Ulica = this.editWorkerForm.value.ulica as string;
    this.workerObjectList[workerObjectToChange].NumerDomu = this.editWorkerForm.value.numerDomu as unknown as number;
    this.workerObjectList[workerObjectToChange].Miasto = this.editWorkerForm.value.miasto as string;
    this.workerObjectList[workerObjectToChange].KodPocztowy = this.editWorkerForm.value.kodPocztowy as string;
    this.workerObjectList[workerObjectToChange].NumerTelefonu = this.editWorkerForm.value.numerTelefonu as unknown as number;

    this.stopEdit();
    this.newWorkerObjectList()
    this.succesStateFlag = true;
  }

  stopEdit(){
    this.editWorkerPopUp = false;
    this.foundWorkerToEdit = null;
    this.workerObjectToChangeId = 0;
  }

  newWorkerObjectList(){
    this.data.changeWorkerObjectList(this.workerObjectList);
  }

}
