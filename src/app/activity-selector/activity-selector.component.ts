import { Component } from '@angular/core';
import { DateService } from '../services/date.service';

@Component({
  selector: 'app-activity-selector',
  imports: [],
  templateUrl: './activity-selector.component.html',
  styleUrl: './activity-selector.component.scss'
})
export class ActivitySelectorComponent {
  constructor(private dateService: DateService) {}
  formattedDate: string = '';

  getDate() { 
    let date: Date | null;
    let dateMonth: string;

    date = this.dateService.getSelectedDate(); 
    dateMonth = date ? date.toLocaleString('default', { month: 'long' }) : '';

    if (date != null){
      return date? `${date.getDate()} ${dateMonth} ${date.getFullYear()}` : '';
    }else{
      let actualDate = new Date();
      actualDate = new Date();
      let actualDateMonth = actualDate.toLocaleString('default', { month: 'long' });
      return actualDate? `${actualDate.getDate()} ${actualDateMonth} ${actualDate.getFullYear()}` : '';
    }
  }

  ngOnInit(): void {
    this.dateService.selectedDate$.subscribe(date => {
      this.updateFormattedDate(date);
    });

    // Establecer la fecha inicial
    this.updateFormattedDate(this.dateService.getSelectedDate());
  }

  updateFormattedDate(date: Date | null): void {
    if (date) {
      const month = date.toLocaleString('default', { month: 'long' });
      this.formattedDate = `${date.getDate()} ${month} ${date.getFullYear()}`;
    } else {
      const actualDate = new Date();
      const actualMonth = actualDate.toLocaleString('default', { month: 'long' });
      this.formattedDate = `${actualDate.getDate()} ${actualMonth} ${actualDate.getFullYear()}`;
    }
  }

  incrementDate(): void {
    const date = this.dateService.getSelectedDate();
    if (date) {
      date.setDate(date.getDate() + 1);
      this.dateService.setSelectedDate(new Date(date)); // Crear nueva instancia para que el observable emita
    }
  }

  decrementDate(): void {
    const date = this.dateService.getSelectedDate();
    if (date) {
      date.setDate(date.getDate() - 1);
      this.dateService.setSelectedDate(new Date(date)); // Crear nueva instancia para que el observable emita
    }
  }

}
