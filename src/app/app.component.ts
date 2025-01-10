import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { MyCalendarComponent } from "./calendar/calendar.component";

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    RouterOutlet, NavbarComponent,
    MyCalendarComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'APP4vGym';
}
