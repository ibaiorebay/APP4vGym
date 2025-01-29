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
  imports: [ButtonModule, CarouselModule, DialogModule, MonitorComponent, FormsModule, CommonModule],
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
    { id: 1, name: 'Miguel Goyena', email: 'miguel.goyena@example.com', phone: '643231413', photo: 'miguel.jpg' },
    { id: 2, name: 'Lourdes Domínguez', email: 'ldominguez@gmail.com', phone: '623231413', photo: 'lourdes.jpg' },
    { id: 3, name: 'Joaquín Rodríguez', email: 'jrodrig@hotmail.es', phone: '643231413', photo: 'joaquin.jpg' },
    { id: 4, name: 'Rodríguez', email: 'jrodrig@hotmail.es', phone: '633231413', photo: 'default.jpg' }
  ];

  monitorToEdit: MonitorComponentInterface | null = null; // Para almacenar el monitor que se va a editar
  searchValue = '';  // Valor del input de búsqueda

  get filteredMonitors() {
    return this.monitors.filter((monitor) =>
      monitor.name.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      monitor.email.toLowerCase().includes(this.searchValue.toLowerCase()) ||
      monitor.phone.toString().includes(this.searchValue) ||
      monitor.id.toString().includes(this.searchValue)
    );
  }

  showAddMonitor = false;
  newMonitor: MonitorComponentInterface = { id: 0, name: '', email: '', phone: '', photo: 'default.jpg' };

  showAddMonitorModal() {
    this.monitorToEdit = null;  // Resetear edición anterior
    this.newMonitor = { id: this.getNextMonitorId(), name: '', email: '', phone: '', photo: 'default.jpg' };
    this.showAddMonitor = true;
  }

  addMonitor() {
    if (this.newMonitor.name && this.newMonitor.email && this.newMonitor.phone) {
      if (this.monitorToEdit) {
        // Si estamos editando, actualizamos el monitor existente
        const index = this.monitors.findIndex(m => m.id === this.monitorToEdit!.id);
        if (index !== -1) {
          this.monitors[index] = { ...this.newMonitor };
        }
      } else {
        // Si no estamos editando, añadimos un nuevo monitor
        this.monitors.push({ ...this.newMonitor });
      }
      this.cancelAddMonitor();
    }
  }

  cancelAddMonitor() {
    this.newMonitor = { id: 0, name: '', email: '', phone: '', photo: 'default.jpg' };
    this.showAddMonitor = false;
  }

  editMonitor(monitor: MonitorComponentInterface) {
    this.monitorToEdit = monitor;
    this.newMonitor = { ...monitor }; // Rellenar el modal con los datos del monitor
    this.showAddMonitor = true;
  }

  deleteMonitor(monitor: MonitorComponentInterface) {
    const index = this.monitors.findIndex(m => m.id === monitor.id);
    if (index !== -1) {
      this.monitors.splice(index, 1); // Eliminar el monitor del array
    }
  }

  private getNextMonitorId(): number {
    return this.monitors.length > 0 ? Math.max(...this.monitors.map(m => m.id)) + 1 : 1;
  }
}
