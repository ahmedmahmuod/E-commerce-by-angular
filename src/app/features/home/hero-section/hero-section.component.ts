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
      description: 'Explore our wide range of premium brands',
    },
    {
      image: 'assets/images/imgSlider2.jpg',
      title: 'Quality & Style Combined',
      description: 'Find the perfect match for your lifestyle',
    },
    {
      image: 'assets/images/imgSlider3.avif',
      title: 'Exclusive Collections',
      description: 'Shop the latest trends and innovations',
    },
    {
      image: 'assets/images/imgSlider3.avif',
      title: 'Exclusive Collections',
      description: 'Shop the latest trends and innovations',
    },
  ];


}
