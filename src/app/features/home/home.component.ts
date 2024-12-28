import { Component, CUSTOM_ELEMENTS_SCHEMA, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { register } from 'swiper/element/bundle';
import { BrandsModel } from '../../core/models/brands/brands.model';
import { BrandsService } from '../../core/services/brands/brands.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class HomeComponent {
  brands = signal<BrandsModel[]>([]);

  breakpoints = {
    320: {
      slidesPerView: 2,
      spaceBetween: 20
    },
    480: {
      slidesPerView: 3,
      spaceBetween: 30
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 30
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 40
    }
  };

  constructor(private brandsService: BrandsService) {
    register();
    this.brandsService.getAllBrands().subscribe((brands: BrandsModel[]) => {
      this.brands.set(brands);
      console.log(this.brands());

    });
  }

}
