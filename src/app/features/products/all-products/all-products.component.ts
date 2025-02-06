import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, of, take } from 'rxjs';
import { Product } from '../../../core/models/product/product.model';
import { ProductFiltersComponent } from '../../../shared/components/products-filter/products-filter.component';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import { HomeHeaderPageComponent } from '../../../shared/components/home-header/home-header-page.component';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import {
  selectAllProducts,
  selectAllProductsLoading,
} from '../../../stores/products/all-products-store/all-products.selector';
import * as AllProductsAction from '../../../stores/products/all-products-store/all-products.action';
import { PageTitleComponent } from "../../../shared/components/page-title/page-title.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [
    CommonModule,
    NzPageHeaderModule,
    ProductCardComponent,
    HomeHeaderPageComponent,
    SpinnerComponent,
    ProductFiltersComponent,
    PageTitleComponent,
    TranslateModule
],
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css'],
})
export class AllProductsComponent implements OnInit {
  // Observables for products and loading state
  products$!: Observable<Product[]>;
  isLoading$!: Observable<boolean>;

  // Signals for filtered brands and categories
  filteredBrands = signal<any>([]);
  filteredCategories = signal<any>([]);

  // Signal to hold filter values
  formFilterValues = signal<any>({});

  // Variable to track if products are available
  hasProducts = signal<boolean>(true);

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Dispatch action to load products only if they are not already loaded
    this.store
      .select(selectAllProducts)
      .pipe(take(1))
      .subscribe((products) => {
        if (!products || products.length === 0) {
          this.store.dispatch(AllProductsAction.loadAllProducts());
        }
      });

    // Assign observables from the store
    this.products$ = this.store.select(selectAllProducts);
    this.isLoading$ = this.store.select(selectAllProductsLoading);

    this.products$.subscribe((products: Product[]) => {
      if (products && products.length > 0) {
        this.extractFilterOptions(products); // Extract brands and categories
      }
    });
  }

  // Extract unique brands and categories from products
  extractFilterOptions(products: Product[]): void {
    const brands = [...new Set(products.map((product) => product.brand.name))];
    const categories = [
      ...new Set(products.map((product) => product.category.name)),
    ];

    this.filteredBrands.set(brands);
    this.filteredCategories.set(categories);
  }

  // Handle filter values from child component
  onFormFilterValues(values: any): void {
    this.formFilterValues.set(values);
    this.applyFilters(values);
  }

  // Apply filters to products
  applyFilters(filterValues: any): void {
    this.store.select(selectAllProducts).subscribe((products: Product[]) => {
      let filteredProducts = [...products];

      // Filter by search query
      if (filterValues.searchQuery) {
        filteredProducts = filteredProducts.filter((product) =>
          product.title
            .toLowerCase()
            .includes(filterValues.searchQuery.toLowerCase())
        );
      }

      // Filter by category
      if (filterValues.selectedCategory !== 'all') {
        filteredProducts = filteredProducts.filter(
          (product) => product.category.name === filterValues.selectedCategory
        );
      }

      // Filter by brand
      if (filterValues.selectedBrand !== 'all') {
        filteredProducts = filteredProducts.filter(
          (product) => product.brand.name === filterValues.selectedBrand
        );
      }

      // Filter by price range
      if (filterValues.selectedPriceRange !== 'all') {
        if (filterValues.selectedPriceRange === 'low-to-high') {
          filteredProducts = [...filteredProducts].sort(
            (a, b) => a.price - b.price
          );
        } else if (filterValues.selectedPriceRange === 'high-to-low') {
          filteredProducts = [...filteredProducts].sort(
            (a, b) => b.price - a.price
          );
        } else if (filterValues.selectedPriceRange === 'discounts') {
          filteredProducts = [...filteredProducts].filter(
            (product) => product.priceAfterDiscount
          );
        }
      }

      // Update hasProducts based on filtered products
      this.hasProducts.set(filteredProducts.length > 0);
      
      // Update the products observable
      this.products$ = of(filteredProducts);
    });
  }
}
