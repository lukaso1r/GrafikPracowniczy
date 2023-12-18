import { Component, OnInit } from '@angular/core';
import { DaneService } from '../dane.service';
import { ShiftClass } from '../model/ShiftClass';
import { WorkerClass } from '../model/WorkerClass';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-shifts-view',
  templateUrl: './shifts-view.component.html',
  styleUrl: './shifts-view.component.css',
  providers: [DatePipe]
})
export class ShiftsViewComponent implements OnInit {

  message: string;
  shiftList: ShiftClass[] = [];
  workerObjectList: WorkerClass[] = [];
  testDate: Date = new Date(2023, 0, 1);


  //test variables
  testId: number = 2;

  addShiftForm = new FormGroup({date: new FormControl(''), workers: new FormControl('')});

  constructor(private data: DaneService, private datePipe: DatePipe){
    this.message = '';
  }

  ngOnInit(): void {
    this.data.currentMessage.subscribe(message => this.message = message);
    this.data.currentshiftList.subscribe(shiftList => this.shiftList = shiftList);
    this.data.currentWorkerObjectList.subscribe(workerObjectList => this.workerObjectList = workerObjectList);
  }


  deleteShift(shiftId: number){
    let index = this.shiftList.findIndex((shift: ShiftClass) => shift.Id === shiftId);
    if (index !== -1) {
        this.shiftList.splice(index, 1);
        this.newShiftList();
        console.log("delete shift");
        console.log(this.shiftList);
    }
  }

  addShift(){

  }

  SaveData(){
    console.log(this.addShiftForm.value);
    // let selectedWorkers: WorkerClass[] = this.addShiftForm.value.workers as unknown as WorkerClass[];


    // this.worker.saveWorkerData(this.addWorker.value).subscribe((result)=>{
    // console.log(result);
    // this.succesStateFlag = true;
    // this.addWorker.reset({});
    // });
    // this.shiftList.push(new ShiftClass(this.testId, this.addShiftForm.value.date as unknown as Date, this.addShiftForm.value.workers as unknown as WorkerClass[]));
    // this.testId++;

  }



  newShiftList(){
    this.data.changeShiftList(this.shiftList);
  }

  addShiftToList(){
    this.shiftList.push(new ShiftClass(this.testId, this.testDate, this.workerObjectList));
    this.testId++;
  }


  //test
  testFunction(){
    // this.shiftList.push(new ShiftClass(1, this.testDate, this.workerObjectList));
    // console.log(this.shiftList);
    console.log(this.shiftList);
    console.log(this.workerObjectList);
    this.addShiftToList();
    this.newShiftList();
  }

}
