import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ShiftClass } from './model/ShiftClass';
import { WorkerClass } from './model/WorkerClass';

@Injectable({
  providedIn: 'root'
})
export class DaneService {


  shiftList: ShiftClass[] = [];
  shiftListSource = new BehaviorSubject<ShiftClass[]>([]);
  currentshiftList = this.shiftListSource.asObservable();

  workerObjectList: WorkerClass[] = [];
  workerObjectListSource = new BehaviorSubject<WorkerClass[]>([]);
  currentWorkerObjectList = this.workerObjectListSource.asObservable();

  private messageSource = new BehaviorSubject<string>("podstawowa wiadomosc");
  currentMessage = this.messageSource.asObservable();


  constructor() { }

  changeMessage(message: string){
    this.messageSource.next(message);
  }

  changeShiftList(shiftList: ShiftClass[]){
    this.shiftListSource.next(shiftList);
  }

  changeWorkerObjectList(workerObjectList: WorkerClass[]){
    this.workerObjectListSource.next(workerObjectList);
  }

  
}
