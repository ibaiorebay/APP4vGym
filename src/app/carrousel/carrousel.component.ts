import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';

@Component({
  selector: 'app-carrousel',
  imports: [ButtonModule, CarouselModule],
  templateUrl: './carrousel.component.html',
  styleUrl: './carrousel.component.scss'
})
export class CarrouselComponent {
    images: { random: string; picture: string; }[]; 
    responsiveOptions;

    constructor() {
      this.images = [
        {random: 'Random', picture: 'https://picsum.photos/id/944/900/500'},
        {random: 'Samoa', picture: 'https://picsum.photos/id/1011/900/500'},
        {random: 'Tonga', picture: 'https://picsum.photos/id/984/900/500'},
        {random: 'Cook Island', picture: 'https://picsum.photos/id/944/900/500'},
        {random: 'Niue', picture: 'https://picsum.photos/id/1011/900/500'},
        {random: 'American Samoa', picture: 'https://picsum.photos/id/984/900/500'}
    ];
        this.responsiveOptions = [{
            breakpoint: '1024px',
            numVisible: 1,
            numScroll: 3
        }];
    }
}
