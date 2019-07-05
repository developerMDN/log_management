import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceLogmanagementService {

  post: any;

  constructor(private http: HttpClient) { }

   getLog() {
    return this.http.get('api/LogProyecto');
  }

  getLogById(id) {
    console.log('api/LogProyecto/' + id);
    return this.http.get('api/LogProyecto/' + id);
  }

}
