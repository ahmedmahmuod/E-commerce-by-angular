import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hero-section',
  standalone: true,
  imports: [CommonModule, NzCarouselModule, RouterLink],
  templateUrl: './hero-section.component.html',
  styleUrls: ['./hero-section.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})

export class HeroSectionComponent {
  heroSlides = [
    {
      image: 'assets/images/imgSlider1.jpg',
      title: 'Discover Amazing Products',
    },
    {
      image: 'assets/images/imgSlider2.jpg',
      title: 'Quality & Style Combined',
    },
  ];


}
