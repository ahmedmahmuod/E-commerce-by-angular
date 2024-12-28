import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsModel } from '../../core/models/brands/brands.model';
import { BrandsService } from '../../core/services/brands/brands.service';
import { ButtonModule } from 'primeng/button';
import { ProductsBrandService } from '../../core/services/products/products-brand.service';
import { Store } from '@ngrx/store';
import * as BrandsActions from '../../stores/brands-store/brands.actions';

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
    private brandsService: BrandsService,
    private productsBrandService: ProductsBrandService,
    private store: Store
  ) {
    this.brandsService.getAllBrands().subscribe((brands: BrandsModel[]) => {
      const firstTenBrands = brands.slice(0, 4);
      this.brands.set(firstTenBrands);
    });
  }

  // Click on view all brands
  clickViewAllBrands() {
    this.brandsService.getAllBrands().subscribe((brands: BrandsModel[]) => {
      this.brands.set(brands);
    });
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
