import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WorkersService {

  url = "http://localhost:3000/workers/";

  constructor(private http:HttpClient) { }
  getAllWorkers(){
    return this.http.get(this.url);
  }
}
