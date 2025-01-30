import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';
import { MonitorComponent } from '../monitor/monitor.component';
import { FormsModule } from '@angular/forms';
import { MonitorComponentInterface } from '../interfaces/monitor-component';
import { MonitorService } from '../services/monitor.service';
import { MonitorDialogComponent } from '../monitor-dialog/monitor-dialog.component';

@Component({
  selector: 'app-carrousel',
  standalone: true,
  imports: [ButtonModule, CarouselModule, DialogModule, MonitorComponent, FormsModule, CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss']
})
export class CarrouselComponent implements OnInit {
  monitors: MonitorComponentInterface[] = [];
  searchValue = '';
  showAddMonitor = false;
  monitorToEdit: MonitorComponentInterface | null = null;
  newMonitor: MonitorComponentInterface = { id: 0, name: '', email: '', phone: '', photo: 'default.jpg' };

  constructor(private monitorService: MonitorService, public dialog: MatDialog) {}

  ngOnInit() {
    this.loadMonitors();
  }

  loadMonitors() {
    this.monitorService.getMonitors().subscribe((data) => {
      this.monitors = data;
    });
  }

  get filteredMonitors() {
    return this.monitors.filter((monitor) =>
      monitor.name.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      monitor.email.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      monitor.phone.toString().includes(this.searchValue)
    );
  }

  showAddMonitorModal(monitor?: MonitorComponentInterface) {
    const dialogRef = this.dialog.open(MonitorDialogComponent, {
      data: { monitor: monitor },
      panelClass: 'custom-dialog',
      autoFocus: false
    });

    if (monitor) {
      dialogRef.componentInstance.title = 'Actualizar Monitor';  // Title for updating
    } else {
      dialogRef.componentInstance.title = 'Añadir Monitor';  // Title for adding
    }

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        if (monitor) {
          // Update monitor
          this.monitorService.updateMonitor(monitor.id, result).subscribe(() => {
            this.loadMonitors();
          });
        } else {
          // Create new monitor
          this.monitorService.createMonitor(result).subscribe(() => {
            this.loadMonitors();
          });
        }
      }
    });
  }

  editMonitor(monitor: MonitorComponentInterface) {
    this.showAddMonitorModal(monitor);
  }

  deleteMonitor(monitor: MonitorComponentInterface) {
    this.monitorService.deleteMonitor(monitor.id).subscribe(() => {
      this.loadMonitors();
    });
  }
}