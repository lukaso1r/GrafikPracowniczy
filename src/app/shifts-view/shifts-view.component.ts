import { Component, OnInit } from '@angular/core';
import { DaneService } from '../dane.service';
import { ShiftClass } from '../model/ShiftClass';
import { WorkerClass } from '../model/WorkerClass';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { WorkersService } from '../workers.service';


@Component({
  selector: 'app-shifts-view',
  templateUrl: './shifts-view.component.html',
  styleUrl: './shifts-view.component.css',
  providers: [DatePipe]
})
export class ShiftsViewComponent implements OnInit {

  shiftList: ShiftClass[] = [];
  shiftListTest: any = [];
  workerObjectList: WorkerClass[] = [];
  testDate: Date = new Date(2023, 0, 1);


  //test variables
  testId: number = 2;

  addShiftForm = new FormGroup({date: new FormControl(''), workers: new FormControl('')});

  constructor(private data: DaneService, private datePipe: DatePipe, private worker:WorkersService){
    this.initializeData();
  }

  ngOnInit(): void {
    this.data.currentshiftList.subscribe(shiftList => this.shiftList = shiftList);
    this.data.currentWorkerObjectList.subscribe(workerObjectList => this.workerObjectList = workerObjectList);
  }

  async initializeData(): Promise<void> {
    const allData = await this.worker.getAllShifts().toPromise();
    console.log("import zmian");
    console.log(allData);
    this.shiftListTest = allData;

    // Przetwórz dane i utwórz obiekty WorkerClass
    this.shiftList = this.shiftListTest.map((workerShiftItem: any) => {
      return new ShiftClass(
        workerShiftItem.id,
        workerShiftItem.date,
        workerShiftItem.workers as unknown as WorkerClass[]
      );
    });
    this.newShiftList()
    console.log(this.shiftList[0].Workers[0]);
  }

  deleteShift(shiftId: number){
    let index = this.shiftList.findIndex((shift: ShiftClass) => shift.Id === shiftId);
    if (index !== -1) {
      this.shiftList.splice(index, 1);
    }
    this.worker.deleteShifts(shiftId).subscribe((result) => {
      console.log(result);
    });
    this.newShiftList();
  }

  getCurrentDateTime(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }


  SaveData(){
    console.log(this.addShiftForm.value);
    
    this.shiftList.push(new ShiftClass(this.testId, this.addShiftForm.value.date as unknown as Date, this.addShiftForm.value.workers as unknown as WorkerClass[]));

    this.worker.saveShiftsData(this.addShiftForm.value).subscribe((result)=>{
      console.log(result);
      this.addShiftForm.reset();
    });
    this.testId++;

  }





  newShiftList(){
    this.data.changeShiftList(this.shiftList);
  }

  addShiftToList(){
    this.shiftList.push(new ShiftClass(this.testId, this.testDate, this.workerObjectList));
    this.testId++;
  }




}
