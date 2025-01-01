import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { register } from 'swiper/element/bundle';
import { BrandsModel } from '../../core/models/brands/brands.model';
import { Store } from '@ngrx/store';
import { selectBrands } from '../../stores/brands-store/brands.selectors';
import * as BrandsActions from '../../stores/brands-store/brands.actions';
import * as CategoriesActions from '../../stores/categories-store/categories.actions';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import { selectCategories } from '../../stores/categories-store/categories.selectors';
import { ProductsService } from '../../core/services/products/products.service';
import { RouterLink } from '@angular/router';

register();

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HeroSectionComponent, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class HomeComponent {
  private productsService = inject(ProductsService);

  brands = signal<BrandsModel[]>([]);
  categories = signal<BrandsModel[]>([]);

  breakpoints = {
    320: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    480: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 5,
      spaceBetween: 40,
    },
  };

  constructor(private store: Store) {
    // Call ngrx store to get all Categories
    this.store.dispatch(CategoriesActions.loadCategories());
    effect(
      () => {
        this.store
          .select(selectCategories)
          .subscribe((categories) => this.categories.set(categories));
      },
      { allowSignalWrites: true }
    );

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

  // On click Category to send id category to get products
  onCategory(id: string) {
    this.productsService.getProductsByCategory(id);
  }
}
