import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})
export class ActivityComponent {
  @Input() slot!: any;
  @Output() editActivity = new EventEmitter<any>();
  @Output() deleteActivity = new EventEmitter<number>();
  @Output() createActivity = new EventEmitter<any>();

  // Editar actividad existente
  onEdit(): void {
    this.editActivity.emit(this.slot.activity);
  }

  // Eliminar actividad
  onDelete() {
    if (this.slot.activity?.id) {
      this.deleteActivity.emit(this.slot.activity.id);
    }
  }

  // Crear nueva actividad si el slot está vacío
  onCreate() {
    if (!this.slot.activity) {
      this.createActivity.emit(this.slot);
    }
  }
}
