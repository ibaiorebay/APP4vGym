import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Proveedor a nivel global
})
export class activityService {

  private apiUrl = 'http://localhost:3000'; // URL base de la API

  constructor(private http: HttpClient) {}

  // Método GET
  getActivities(): Observable<any> {
    return this.http.get(`${this.apiUrl}/activities`);
  }

  // Método GET por ID
  getActivityById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/activities/${id}`);
  }

  // Método POST
  createActivity(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/activities`, data);
  }

  // Método DELETE
  deleteActivity(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/activities/${id}`);
  }

  
  // Método PUT
  updateActivity(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/activities/${id}`, data);
  }
}
