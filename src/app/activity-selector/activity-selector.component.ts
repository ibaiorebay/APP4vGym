import { Component, OnInit } from '@angular/core';
import { DateService } from '../services/date.service';
import { ActivityComponent } from '../activity/activity.component';
import { activityService } from '../services/activity.service';
import { MonitorService } from '../services/monitor.service'; // Importamos el MonitorService
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-activity-selector',
  standalone: true,
  imports: [ActivityComponent, CommonModule, FormsModule],
  templateUrl: './activity-selector.component.html',
  styleUrls: ['./activity-selector.component.scss']
})
export class ActivitySelectorComponent implements OnInit {
  formattedDate: string = '';
  isModalOpen = false;
  isEditing = false;
  activityTypes: any[] = [];
  availableMonitors: any[] = [];
  selectedActivityType: string | null = null;
  selectedMonitors: string[] = [];
  monitorDropdowns: number[] = [];
  activitySlots: any[] = [];
  timeSlots = ["09:00", "10:30", "12:00"]; // Horarios fijos de las actividades
  selectedActivityId: number | null = null; // Para almacenar el ID de la actividad seleccionada

  constructor(
    private dateService: DateService,
    private activityService: activityService,   // Inyectamos el ActivityService
    private monitorService: MonitorService     // Inyectamos el MonitorService
  ) {}

  ngOnInit(): void {
    this.dateService.selectedDate$.subscribe(date => {
      this.updateFormattedDate(date);
      this.loadActivitySlots(date);
    });

    // Establecer la fecha inicial
    this.updateFormattedDate(this.dateService.getSelectedDate());
    this.loadActivitySlots(this.dateService.getSelectedDate());
  }

  openModalForCreation() {
    this.isModalOpen = true;
    this.isEditing = false;
    this.selectedActivityType = null;
    this.selectedMonitors = [];
    this.monitorDropdowns = [];
    this.availableMonitors = []; // Limpiamos monitores disponibles al crear una nueva actividad
    this.selectedActivityId = null; // Aseguramos que no haya ID seleccionado
  }

  openModalForEditing(activity: any) {
    this.isModalOpen = true;
    this.isEditing = true;
    this.selectedActivityType = activity.type;
    this.selectedMonitors = activity.monitors.map((monitor: any) => monitor.id); // Convertimos los monitores en IDs
    this.monitorDropdowns = new Array(activity.monitors.length).fill(0);
    this.selectedActivityId = activity.id; // Guardamos el ID de la actividad para edición
    this.loadMonitorsForActivity(activity); // Cargamos los monitores de la actividad para edición
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onActivityTypeChange() {
    if (this.selectedActivityType) {
      this.monitorService.getMonitors().subscribe(data => {
        // Filtramos los monitores según el número de monitores necesarios para la actividad
        const numMonitorsRequired = this.activityTypes.find(type => type.name === this.selectedActivityType)?.number_monitors || 0;
        this.availableMonitors = data.slice(0, numMonitorsRequired); // Asumimos que los monitores están disponibles en el mismo orden
        this.monitorDropdowns = new Array(numMonitorsRequired).fill(0);
      });
    }
  }

  loadMonitorsForActivity(activity: any) {
    if (activity && activity.monitors && activity.monitors.length) {
      // Si estamos editando, necesitamos cargar los monitores asociados a la actividad
      this.monitorService.getMonitors().subscribe(data => {
        this.availableMonitors = data;
        const numMonitorsRequired = activity.monitors.length;
        this.monitorDropdowns = new Array(numMonitorsRequired).fill(0);
      });
    }
  }

  saveActivity() {
    const activityData = {
      type: this.selectedActivityType,
      monitors: this.selectedMonitors
    };

    if (this.isEditing && this.selectedActivityId !== null) {
      // Actualizar actividad
      this.activityService.updateActivity(this.selectedActivityId, activityData).subscribe(() => {
        this.closeModal();
      });
    } else {
      // Crear actividad
      this.activityService.createActivity(activityData).subscribe(() => {
        this.closeModal();
      });
    }
  }

  cancel() {
    this.closeModal();
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
