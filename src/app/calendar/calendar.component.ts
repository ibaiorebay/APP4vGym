import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarMonthModule, CalendarEvent, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { startOfDay } from 'date-fns';

export function adapterFactoryFn(): DateAdapter {
  return adapterFactory();
}

@Component({
  selector: 'app-my-calendar',
  standalone: true,
  imports: [
    CommonModule,
    CalendarMonthModule // Importa el módulo de la vista SIN forRoot()
  ],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [ // Configura el DateAdapter aquí
    {
      provide: DateAdapter,
      useFactory: adapterFactoryFn,
    },
  ],
})
export class MyCalendarComponent {
  viewDate: Date = new Date(); // Inicializa viewDate aquí!!!
  events: CalendarEvent[] = [
    {
      start: startOfDay(new Date()),
      title: 'Un evento',
    },
  ];

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    console.log('Day clicked', date, events);
  }
  handleEvent(action: string, event: CalendarEvent): void {
    console.log('Event', action, event);
  }
}