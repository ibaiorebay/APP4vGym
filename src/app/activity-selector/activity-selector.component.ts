import { Component, OnInit } from '@angular/core';
import { DateService } from '../services/date.service';
import { ActivityComponent } from '../activity/activity.component';
import { activityService } from '../services/activity.service';

@Component({
  selector: 'app-activity-selector',
  standalone: true,
  imports: [ActivityComponent],
  templateUrl: './activity-selector.component.html',
  styleUrl: './activity-selector.component.scss'
})
export class ActivitySelectorComponent implements OnInit {
  formattedDate: string = '';
  activitySlots: any[] = [];
  timeSlots = ["09:00", "10:30", "12:00"]; // Horarios fijos de las actividades

  constructor(private dateService: DateService, private activityService: activityService) {}

  ngOnInit(): void {
    this.dateService.selectedDate$.subscribe(date => {
      this.updateFormattedDate(date);
      this.loadActivitySlots(date);
    });

    // Establecer la fecha inicial
    this.updateFormattedDate(this.dateService.getSelectedDate());
    this.loadActivitySlots(this.dateService.getSelectedDate());
  }

  updateFormattedDate(date: Date | null): void {
    if (date) {
      const month = date.toLocaleString('default', { month: 'long' });
      this.formattedDate = `${date.getDate()} ${month} ${date.getFullYear()}`;
    }
  }

  loadActivitySlots(date: Date | null): void {
    const selectedDate = date ? date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
  
    this.activityService.getActivities().subscribe({
      next: (data: any[]) => {
        // Filtramos las actividades del día seleccionado
        const activitiesForDay = data.filter(activity => activity.date_start.startsWith(selectedDate));
  
        // Mapeamos cada franja horaria
        this.activitySlots = this.timeSlots.map(time => {
          // Buscamos si hay una actividad que coincida con la hora exacta
          const activity = activitiesForDay.find(act => {
            const activityTime = act.date_start.split('T')[1].substring(0, 5); // Extrae HH:mm
            return activityTime === time; // Compara con la franja horaria
          });
  
          return activity
            ? {
                id: activity.id,
                isFree: false,
                activity: {
                  id: activity.id,
                  name: activity.activity_type.name,
                  dateStart: activity.date_start,
                  dateEnd: activity.date_end,
                  monitors: activity.monitors.map((monitor: any) => ({
                    id: monitor.id,
                    name: monitor.name,
                    email: monitor.email,
                    phone: monitor.phone,
                    photo: monitor.photo
                  }))
                }
              }
            : { isFree: true }; // Si no hay actividad, se deja libre
        });
      },
      error: err => console.error('Error al cargar actividades:', err)
    });
  }
  

  incrementDate(): void {
    const date = this.dateService.getSelectedDate();
    if (date) {
      date.setDate(date.getDate() + 1);
      this.dateService.setSelectedDate(new Date(date));
    }
  }

  decrementDate(): void {
    const date = this.dateService.getSelectedDate();
    if (date) {
      date.setDate(date.getDate() - 1);
      this.dateService.setSelectedDate(new Date(date));
    }
  }
}
