import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { DialogModule } from 'primeng/dialog';
import { MonitorComponent } from '../monitor/monitor.component';
import { FormsModule } from '@angular/forms';
import { MonitorComponentInterface } from '../interfaces/monitor-component';

@Component({
  selector: 'app-carrousel',
  imports: [ButtonModule, CarouselModule, DialogModule,MonitorComponent,FormsModule,CommonModule],
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.scss']
})
export class CarrouselComponent {
  responsiveOptions;

    constructor() {
        this.responsiveOptions = [{
            breakpoint: '1024px',
            numVisible: 1,
            numScroll: 3
        }];
    }
  monitors: MonitorComponentInterface[] = [
    { name: 'Miguel Goyena', mail: 'miguel.goyena@example.com', phoneNumber: 643231413 },
    { name: 'Lourdes Domínguez', mail: 'ldominguez@gmail.com', phoneNumber: 623231413 },
    { name: 'Joaquín Rodríguez', mail: 'jrodrig@hotmail.es', phoneNumber: 643231413 },
    { name: ' Rodríguez', mail: 'jrodrig@hotmail.es', phoneNumber: 633231413 },
  ];
  monitorToEdit: MonitorComponentInterface | null = null; // To hold the monitor to be edited
  searchValue = '';  // A variable to hold the search input value

  get filteredMonitors() {
    return this.monitors.filter((monitor) =>
      monitor.name.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      monitor.mail.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      monitor.phoneNumber.toString().includes(this.searchValue)
    );
  }

  showAddMonitor = false;
  newMonitor: MonitorComponentInterface = { name: '', mail: '', phoneNumber: 0 };

  showAddMonitorModal() {
    this.monitorToEdit = null;  // Reset any previous editing
    this.newMonitor = { name: '', mail: '', phoneNumber: 0 };
    this.showAddMonitor = true;
  }

  addMonitor() {
    if (this.newMonitor.name && this.newMonitor.mail && this.newMonitor.phoneNumber) {
      if (this.monitorToEdit) {
        // If we're editing, update the existing monitor
        const index = this.monitors.findIndex(m => m === this.monitorToEdit);
        if (index !== -1) {
          this.monitors[index] = { ...this.newMonitor };
        }
      } else {
        // Otherwise, add a new monitor
        this.monitors.push({ ...this.newMonitor });
      }
      this.cancelAddMonitor();
    }
  }

  cancelAddMonitor() {
    this.newMonitor = { name: '', mail: '', phoneNumber: 0 };
    this.showAddMonitor = false;
  }

  editMonitor(monitor: MonitorComponentInterface) {
    this.monitorToEdit = monitor;
    this.newMonitor = { ...monitor }; // Pre-populate the modal with the monitor's data
    this.showAddMonitor = true; // Show the modal for editing
  }

  deleteMonitor(monitor: MonitorComponentInterface) {
    const index = this.monitors.indexOf(monitor);
    if (index !== -1) {
      this.monitors.splice(index, 1); // Remove the monitor from the array
    }
  }
}
