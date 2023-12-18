//imports

import { WorkerClass } from "./WorkerClass";

export class ShiftClass{

  constructor(
    private id:number,
    private date:Date,
    private workers:WorkerClass[]
    ){
      this.workers = workers || [];
    }

  get Id():number{return this.id;}
  get Date():Date{return this.date;}
  get Workers(): WorkerClass[] { return this.workers; }

  set Id(id: number){this.id = id;};
  set Date(date: Date){this.date = date;};
  set Workers(workers: WorkerClass[]) { this.workers = workers || []; };


  addWorker(worker: WorkerClass) {
    this.workers.push(worker);
  }

  removeWorker(worker: WorkerClass) {
    const index = this.workers.indexOf(worker);
    if (index !== -1) {
      this.workers.splice(index, 1);
    }
  }

}

