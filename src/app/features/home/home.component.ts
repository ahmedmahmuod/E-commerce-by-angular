import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { register } from 'swiper/element/bundle';
import { BrandsModel } from '../../core/models/brands/brands.model';
import { Store } from '@ngrx/store';
import { selectBrands } from '../../stores/brands-store/brands.selectors';
import * as BrandsActions from '../../stores/brands-store/brands.actions';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { CategoriesNavComponent } from '../../shared/components/categories-nav/categories-nav.component';
import { PageTitleComponent } from "../../shared/components/page-title/page-title.component";

register();

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroSectionComponent, CategoriesNavComponent, PageTitleComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent {
  brands = signal<BrandsModel[]>([]);

  // break point for responsive design slider
  public breakpoints = {
    320: { slidesPerView: 2, spaceBetween: 10 },
    640: { slidesPerView: 3, spaceBetween: 15 },
    1024: { slidesPerView: 4, spaceBetween: 20 },
  };

  public swiperConfig = {
    navigation: true,
    pagination: { clickable: true },
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    loop: true,
    speed: 1000,
  };

  constructor(private store: Store) {
    // Call ngrx store to get all brands
    this.store.dispatch(BrandsActions.loadBrands());
    effect(
      () => {
        this.store
          .select(selectBrands)
          .subscribe((brands) => this.brands.set(brands));
      },
      { allowSignalWrites: true }
    );
  }
}
