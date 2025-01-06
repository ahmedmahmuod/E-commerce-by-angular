import { SpinnerComponent } from './../../../shared/components/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCardComponent } from '../../../shared//components/product-card/product-card.component';
import { Product } from '../../../core/models/product/product.model';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { Store } from '@ngrx/store';
import * as ProductsCategoryAction from '../../../stores/products/products-category-store/products-category.action';
import {
  selectProductCategory,
  selectProductCategoryLaoding,
} from '../../../stores/products/products-category-store/products-category.selector';
import { Observable, take } from 'rxjs';
import { HomeHeaderPageComponent } from '../../../shared/components/home-header/home-header-page.component';
import { ProductFiltersComponent } from '../../../shared/components/products-filter/products-filter.component';

@Component({
  selector: 'app-products-category',
  standalone: true,
  imports: [
    CommonModule,
    NzPageHeaderModule,
    SpinnerComponent,
    ProductCardComponent,
    HomeHeaderPageComponent,
    ProductFiltersComponent,
  ],
  templateUrl: './products-category.component.html',
  styleUrl: './products-category.component.css',
})
export class ProductsCategoryComponent {
  private route = inject(ActivatedRoute);
  private store = inject(Store);
  private router = inject(Router);

  categoryId: string;

  productsCategory$: Observable<Product[]>;
  isLoading$: Observable<boolean>;

  constructor() {
      //  Dispatch an action to load the products category
      const navigation = this.router.getCurrentNavigation();
      this.categoryId = navigation?.extras.state?.['id'] || null;
  
      this.store
        .select(selectProductCategory)
        .pipe(take(1))
        .subscribe((products) => {
          if (!products || products.length === 0 || this.isDifferentCategory(products, this.categoryId)) {
            this.store.dispatch(ProductsCategoryAction.loadProductsCategory({categoryId: this.categoryId}));
          }
        });

    //  Subscribe to the products category observable and the loading observable
    this.productsCategory$ = this.store.select(selectProductCategory);
    this.isLoading$ = this.store.select(selectProductCategoryLaoding);
  }
  //  Check if the category has changed
  private isDifferentCategory(
    products: Product[],
    categoryId: string
  ): boolean {
    return products.length > 0 && products[0].category._id !== categoryId;
  }
}
