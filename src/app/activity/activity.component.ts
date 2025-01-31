import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityComponentInterface } from '../interfaces/activity-component';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent {
  @Input() slot!: ActivityComponentInterface;
  @Output() editActivity = new EventEmitter<any>();  // Evento para editar
  @Output() deleteActivity = new EventEmitter<number>(); // Evento para eliminar

  onEdit() {
    if (this.slot.activity) {
      this.editActivity.emit(this.slot.activity); // Emitimos la actividad completa
    }
  }

  onDelete() {
    if (this.slot.activity?.id) {
      this.deleteActivity.emit(this.slot.activity.id); // Emitimos el ID de la actividad
    }
  }
}
