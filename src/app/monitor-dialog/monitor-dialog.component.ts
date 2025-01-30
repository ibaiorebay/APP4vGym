import { Component, Inject, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MonitorComponentInterface } from '../interfaces/monitor-component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-monitor-dialog',
  imports: [FormsModule, MatDialogModule, MatButtonModule],
  templateUrl: './monitor-dialog.component.html',
  styleUrls: ['./monitor-dialog.component.scss']
})
export class MonitorDialogComponent {
  newMonitor: MonitorComponentInterface = { id: 0, name: '', email: '', phone: '', photo: 'icoMonRed.png' };
  @Input() title: string = 'Agregar Monitor';
  constructor(
    public dialogRef: MatDialogRef<MonitorDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { monitor?: MonitorComponentInterface }
  ) {
    if (data.monitor) {
      this.newMonitor = { ...data.monitor };
    }
  }

  cancel(): void {
    this.dialogRef.close();
  }

  save(): void {
    this.dialogRef.close(this.newMonitor);
  }
}
