import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MonitorComponentInterface } from '../interfaces/monitor-component';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.scss']
})
export class MonitorComponent {
  @Input() monitor!: MonitorComponentInterface;
  @Output() edit = new EventEmitter<MonitorComponentInterface>(); // Event emitter for edit
  @Output() delete = new EventEmitter<MonitorComponentInterface>(); // Event emitter for delete

  handleEdit() {
    this.edit.emit(this.monitor);  // Emit the edit event with the monitor object
  }

  handleDelete() {
    this.delete.emit(this.monitor);  // Emit the delete event with the monitor object
  }
}