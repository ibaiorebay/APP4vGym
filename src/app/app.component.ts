import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { CalendarComponent } from './calendar/calendar.component';
import { DateService } from './services/date.service';
import { Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    RouterOutlet, NavbarComponent,
    AppComponent, CalendarComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  selectedDate: Date | null = null;
  private dateSubscription: Subscription;

  constructor(private dateService: DateService) {
    this.dateSubscription = this.dateService.selectedDate$.subscribe(date => {
      this.selectedDate = date;
    });
  }

    ngOnDestroy(): void {
        this.dateSubscription.unsubscribe();
    }
}
