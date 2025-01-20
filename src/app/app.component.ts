import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { DateService } from './services/date.service';
import { Subscription } from 'rxjs';
import { ActivitySelectorComponent } from "./activity-selector/activity-selector.component";
import { PageSelectorComponent } from './page-selector/page-selector.component';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    RouterOutlet, NavbarComponent,
    AppComponent, CalendarComponent,
    ActivitySelectorComponent, PageSelectorComponent,
    CarrouselComponent, CommonModule
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  selectedDate: Date | null = null;
  private dateSubscription: Subscription;
  showActivities: boolean = false;  // Controla la visibilidad de los componentes de actividades
  showMonitors: boolean = false; 
  constructor(private dateService: DateService) {
    this.dateSubscription = this.dateService.selectedDate$.subscribe(date => {
      this.selectedDate = date;
    });
    this.showActivities = true;    // Muestra los componentes de actividades por defecto
  }
  
     // Controla la visibilidad de los componentes de monitores

  // Funciones para mostrar/ocultar los componentes
  onShowActivities() {
    this.showActivities = true;    // Muestra los componentes de actividades
    this.showMonitors = false;     // Oculta los componentes de monitores
  }

  onShowMonitors() {
    this.showMonitors = true;      // Muestra los componentes de monitores
    this.showActivities = false;   // Oculta los componentes de actividades
  }
    ngOnDestroy(): void {
        this.dateSubscription.unsubscribe();
    }
}
