import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  private apiUrl = 'http://localhost:3000/monitors'; // URL de tu API

  constructor(private http: HttpClient) { }

  // Obtener todos los monitores
  getMonitors(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Crear un nuevo monitor
  createMonitor(monitorData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, monitorData);
  }

  // Actualizar un monitor
  updateMonitor(id: number, monitorData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, monitorData);
  }

  // Eliminar un monitor
  deleteMonitor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
