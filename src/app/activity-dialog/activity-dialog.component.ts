import { Component, Inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-activity-dialog',
  standalone: true,
  imports: [FormsModule, MatDialogModule, MatButtonModule, CommonModule, NgFor],
  templateUrl: './activity-dialog.component.html',
  styleUrls: ['./activity-dialog.component.scss']
})
export class ActivityDialogComponent {
  newActivity = {
    id: 0,
    name: '',
    icon: '',
    monitors: [] as { name: string; photo: string }[],
    dateStart: '',
    dateEnd: ''
  };

  @Input() title: string = 'Agregar Actividad';

  constructor(
    public dialogRef: MatDialogRef<ActivityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title?: string; activity?: any; slot?: any }
  ) {
    this.title = data.title || 'Agregar Actividad';

    if (data.activity) {
      // Si estamos editando, copiamos la actividad
      this.newActivity = { ...data.activity, monitors: [...(data.activity.monitors || [])] };
    } else if (data.slot) {
      // Si estamos creando una nueva actividad, usamos la fecha del slot
      this.newActivity.dateStart = data.slot.startTime || '';
      this.newActivity.dateEnd = data.slot.endTime || '';
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.newActivity);
  }

  addMonitor(): void {
    this.newActivity.monitors.push({ name: '', photo: '' });
  }

  removeMonitor(index: number): void {
    this.newActivity.monitors.splice(index, 1);
  }
}
