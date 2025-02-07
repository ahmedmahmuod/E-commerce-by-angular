import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { register } from 'swiper/element/bundle';
import { BrandsModel } from '../../core/models/brands/brands.model';
import { Store } from '@ngrx/store';
import * as BrandsActions from '../../stores/brands-store/brands.actions';
import { selectBrands } from '../../stores/brands-store/brands.selectors';
import { HeroSectionComponent } from './hero-section/hero-section.component';
import * as ProductsAction from '../../stores/products/all-products-store/all-products.action';
import { selectAllProducts } from '../../stores/products/all-products-store/all-products.selector';
import * as CategoriesAction from '../../stores/categories-store/categories.actions';
import { selectCategories } from '../../stores/categories-store/categories.selectors';
import { PageTitleComponent } from '../../shared/components/page-title/page-title.component';
import { Router, RouterLink } from '@angular/router';
import { GlobalBtnComponent } from '../../shared/components/buttons/global-btn/global-btn.component';
import { ProductCardComponent } from '../../shared/components/product-card/product-card.component';
import { Product } from '../../core/models/product/product.model';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { TranslateModule } from '@ngx-translate/core';

register();

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroSectionComponent,
    PageTitleComponent,
    GlobalBtnComponent,
    RouterLink,
    ProductCardComponent,
    ToastModule,
    TranslateModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [MessageService],
  
})
export class HomeComponent  {
  private router = inject(Router);
  private store = inject(Store);

  brands = signal<BrandsModel[]>([]);
  products = signal<Product[]>([]);
  limitProductsFilter = signal<Product[]>([]);
  categories = signal<BrandsModel[]>([]);
  
  constructor() {
    // Call ngrx store to get all brands
    this.store.dispatch(BrandsActions.loadBrands());
    this.store.select(selectBrands).subscribe((brands) => this.brands.set(brands));

    // Call ngrx store to get all products
    this.store.dispatch(ProductsAction.loadAllProducts());
    this.store.select(selectAllProducts).subscribe((products) => {
      this.products.set(products)
      this.filterdProducts();
    });

    // Call ngrx store to get all products
    this.store.dispatch(CategoriesAction.loadCategories());
    this.store.select(selectCategories).subscribe((categories) => this.categories.set(categories));
  }

  // Breakpoints for responsive design slider
  public breakpoints = {
    320: { slidesPerView: 2, spaceBetween: 2 },
    640: { slidesPerView: 3, spaceBetween: 4 },
    768: { slidesPerView: 4, spaceBetween: 4 },
    1024: { slidesPerView: 4, spaceBetween: 4 },
    1440: { slidesPerView: 4, spaceBetween: 4 },
  };

  // Brands Section
  public swiperConfig = {
    navigation: true,
    pagination: { clickable: true },
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    loop: true,
    speed: 1000,
    breakpoints: this.breakpoints,
  };

  // on click brand
  onBrandClick(brand: BrandsModel) {
    this.router.navigate(['/brands', brand._id], {
      state: { title: brand.name },
    });
  }

  // Products Section
  filterdProducts() {
    const limitCount = 5;  
    const moreSoldProducts = this.products().filter((product) => product.sold > 8000).sort((a, b) => b.sold - a.sold);
    const filteredProducts = moreSoldProducts.slice(0, limitCount);
    this.limitProductsFilter.set(filteredProducts)
  }

  // Categories Section
  onCategoryClick(category: BrandsModel) {
    this.router.navigate(['/category',category._id], {state: {title: category.name}});
  }
}
