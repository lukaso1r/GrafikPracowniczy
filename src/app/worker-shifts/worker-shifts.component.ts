import { Component, OnInit, Input } from '@angular/core';
import { DaneService } from '../dane.service';
import { ShiftClass } from '../model/ShiftClass';
import { DatePipe } from '@angular/common';
import { WorkerClass } from '../model/WorkerClass';
import { WorkersService } from '../workers.service';

@Component({
  selector: 'app-worker-shifts',
  templateUrl: './worker-shifts.component.html',
  styleUrl: './worker-shifts.component.css',
  providers: [DatePipe]
})
export class WorkerShiftsComponent implements OnInit{

  @Input() workerInfo: string;
  shiftList: ShiftClass[] = [];
  shiftListTest: any = [];

  constructor(private data: DaneService, private datePipe: DatePipe, private worker:WorkersService){
    this.workerInfo = "";
  }

  ngOnInit(): void {
    this.data.currentshiftList.subscribe(shiftList => this.shiftList = shiftList);
    this.initializeData();
  }

  async initializeData(): Promise<void> {
    const allData = await this.worker.getAllShifts().toPromise();
    console.log("import zmian");
    this.shiftListTest = allData;

    // Przetwórz dane i utwórz obiekty WorkerClass
    this.shiftList = [];
    this.shiftListTest.forEach((workerShiftItem: any) => {
      let shiftClass: ShiftClass = new ShiftClass(
        workerShiftItem.id,
        workerShiftItem.date,
        []
      );
      shiftClass.Workers = workerShiftItem.workers.map((workerData: any) => {
        return new WorkerClass(
          workerData.id,
          workerData.haslo,
          workerData.imie,
          workerData.nazwisko,
          workerData.ulica,
          workerData.numerDomu,
          workerData.miasto,
          workerData.kodPocztowy,
          workerData.numerTelefonu,
          workerData.email,
          workerData.stanowiskoId,
          workerData.dzialID
        );
      });

      for (let i = 0; i < shiftClass.Workers.length; i++) {
        if ((shiftClass.Workers[i].Imie + " " + shiftClass.Workers[i].Nazwisko) === this.workerInfo) {
          this.shiftList.push(shiftClass);
          break;
        }
      }
    });
  }
}
