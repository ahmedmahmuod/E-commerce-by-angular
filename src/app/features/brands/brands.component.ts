import { Component, effect, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsModel } from '../../core/models/brands/brands.model';
import { ButtonModule } from 'primeng/button';
import { ProductsService } from '../../core/services/products/products.service';
import { Store } from '@ngrx/store';
import * as BrandsActions from '../../stores/brands-store/brands.actions';
import { selectBrands } from '../../stores/brands-store/brands.selectors';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent {
  brands = signal<BrandsModel[]>([]);
  productsCount = signal<number>(0);

  constructor(
    private productsBrandService: ProductsService,
    private store: Store
  ) {

    // Get brands from store
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

  // Click on view all brands
  clickViewAllBrands() {
    // get all brands from store
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

  // Click on brand to get products by brand
  clickBrand(brand: any) {
    this.productsBrandService
      .getProductsByBrand(brand._id)
      .subscribe((products: BrandsModel[]) => {
        console.log(products);
      });
  }

  // Loading
  loading: boolean = false;
  load() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }
}
