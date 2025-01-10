import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root' // Asegura que sea un singleton
})
export class DateService {
  private selectedDateSource = new BehaviorSubject<Date | null>(null);
  selectedDate$ = this.selectedDateSource.asObservable(); // Observable para suscribirse

  setSelectedDate(date: Date | null) {
    this.selectedDateSource.next(date);
  }
}