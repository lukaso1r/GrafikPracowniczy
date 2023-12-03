import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkersService {

  url = "http://localhost:3000/workers/";
  urlManagers = "http://localhost:3000/managers/";

  constructor(private http:HttpClient) { }

  getAllWorkers(){
    return this.http.get(this.url);
  }

  getAllManagers(){
    return this.http.get(this.urlManagers);
  }

  saveWorkerData(data:any){
    console.log(data);
    return this.http.post(this.url, data);
  }

  deleteWorker(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }

  updateWorkerData(id: number, data:any){
    return this.http.put(`${this.url}/${id}`, data);
  }
}
