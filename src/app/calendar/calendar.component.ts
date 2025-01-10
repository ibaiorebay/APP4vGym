import { Component } from '@angular/core';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DateService } from '../services/date.service';
@Component({
  selector: 'app-calendar',
  imports: [CommonModule, MatDatepickerModule, MatInputModule, MatFormFieldModule, MatNativeDateModule, FormsModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'], // Use styleUrls (plural)
})
export class CalendarComponent {
  selectedDate: Date | null = null;

  constructor(private dateService: DateService) { } // Inyectamos el servicio

  onDateChange(event: any) {
    this.selectedDate = event.value;
    this.dateService.setSelectedDate(this.selectedDate); // Usamos el servicio
  }
}