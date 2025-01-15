import { Component } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DateService } from '../services/date.service';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    FormsModule,
    MatNativeDateModule,
    AppComponent,
    CalendarComponent
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'], // Use styleUrls (plural)
})
export class CalendarComponent {
  selectedDate: Date | null = null;

  constructor(private dateService: DateService) { }

  ngOnInit(): void {
    // Inicializar la fecha seleccionada con la fecha actual si no está configurada en el servicio
    const currentDate = new Date(); // Obtener la fecha actual
    this.dateService.setSelectedDate(currentDate); // Establecer la fecha actual en el servicio
    this.selectedDate = currentDate; // Asignar la fecha actual al componente

    // Suscribirse al observable del servicio para actualizar la fecha seleccionada
    this.dateService.selectedDate$.subscribe((date) => {
      this.selectedDate = date;
    });
  }

  onDateChange(event: any): void {
    const newDate = event.value;
    this.dateService.setSelectedDate(newDate); // Actualizar la fecha en el servicio
  }

  selectDate(date: Date | null): void {
    this.dateService.setSelectedDate(date); // Usamos el servicio
  }
}
