import { Component,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-page-selector',
  imports: [],
  templateUrl: './page-selector.component.html',
  styleUrl: './page-selector.component.scss'
})
export class PageSelectorComponent {
  @Output() activitySelected = new EventEmitter<void>();
  @Output() monitorSelected = new EventEmitter<void>();

  showActivities() {
    this.activitySelected.emit();
  }

  showMonitors() {
    this.monitorSelected.emit();
  }

}
