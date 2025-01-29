import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityComponentInterface } from '../interfaces/activity-component';

@Component({
  selector: 'app-activity',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity.component.html',
  styleUrl: './activity.component.scss'
})
export class ActivityComponent {
  @Input() slot!: ActivityComponentInterface;
}
