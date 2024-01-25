import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NodeService {
  private baseUrl = 'http://localhost:3002';

  constructor(private http: HttpClient) {}

  getCurrentTime(): Observable<any> {
    return this.http.get(`${this.baseUrl}/current-time`);
  }
}
