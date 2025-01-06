import { Component, OnInit } from '@angular/core';
import { Product } from '../../../core/models/product/product.model';
import { CommonModule } from '@angular/common';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { HomeHeaderPageComponent } from '../../../shared/components/home-header/home-header-page.component';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  selectAllProducts,
  selectAllProductsLoading,
} from '../../../stores/products/all-products-store/all-products.selector';
import * as AllProductsAction from '../../../stores/products/all-products-store/all-products.action';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { ProductFiltersComponent } from "../../../shared/components/products-filter/products-filter.component";

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [
    CommonModule,
    NzPageHeaderModule,
    ProductCardComponent,
    HomeHeaderPageComponent,
    SpinnerComponent,
    ProductFiltersComponent
],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css',
})
export class AllProductsComponent implements OnInit {
  products$!: Observable<Product[]>;
  isLoading$!: Observable<Boolean>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.store.dispatch(AllProductsAction.loadAllProducts());
    this.store.select(selectAllProducts).subscribe((products: Product[]) => {
      this.products$ = of(products);

      if (products.length <= 0) {
        this.store
          .select(selectAllProductsLoading)
          .subscribe((loading: boolean) => {
            this.isLoading$ = of(loading);
          });
      }
    });
  }
}
