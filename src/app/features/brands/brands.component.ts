import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsModel } from '../../core/models/brands/brands.model';
import { ButtonModule } from 'primeng/button';
import { ProductsService } from '../../core/services/products/products.service';
import { Store } from '@ngrx/store';
import * as BrandsActions from '../../stores/brands-store/brands.actions';
import { selectBrands } from '../../stores/brands-store/brands.selectors';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { HomeHeaderPageComponent } from "../../shared/components/home-header/home-header-page.component";
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule, ButtonModule, SpinnerComponent, HomeHeaderPageComponent],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.css',
})
export class BrandsComponent {
  brands$!: Observable<BrandsModel[]>;
  displayedBrands$!: Observable<BrandsModel[]>;
  initialDisplayCount = 8;
  isLoading$!: Observable<boolean>;

  constructor(
    private productsBrandService: ProductsService,
    private store: Store
  ) {
    // Get brands from store
    this.store.dispatch(BrandsActions.loadBrands());
    
    this.store.select(selectBrands).subscribe((brands: BrandsModel[]) => {
      this.displayedBrands$ = of(brands);      
    })
     
  }

  // Click on view all brands
  clickViewAllBrands() {
    // this.displayedBrands.set(this.brands());
  }

  // Click on brand to get products by brand
  clickBrand(brand: any) {
    this.productsBrandService
      .getProductsByBrand(brand._id)
      .subscribe((products: BrandsModel[]) => {
        console.log(products);
      });
  }
}
