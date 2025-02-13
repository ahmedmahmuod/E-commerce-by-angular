import { SpinnerComponent } from './../../../shared/components/spinner/spinner.component';
import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCardComponent } from '../../../shared//components/product-card/product-card.component';
import { Product } from '../../../core/models/product/product.model';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { Store } from '@ngrx/store';
import * as ProductsCategoryAction from '../../../stores/products/products-category-store/products-category.action';
import * as ProductsBrandAction from '../../../stores/products/products-brand-store/products-brand.action';
import { selectProductCategory, selectProductCategoryLaoding } from '../../../stores/products/products-category-store/products-category.selector';
import { selectProductBrand, selectProductBrandLaoding } from '../../../stores/products/products-brand-store/products-brand.selector';
import { map, Observable, of } from 'rxjs';
import { HomeHeaderPageComponent } from '../../../shared/components/home-header/home-header-page.component';
import { ProductFiltersComponent } from '../../../shared/components/products-filter/products-filter.component';
import { TranslateModule } from '@ngx-translate/core';

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
        TranslateModule
    ],
    templateUrl: './products-category.component.html',
    styleUrl: './products-category.component.css'
})
export class ProductsCategoryComponent {
  private store = inject(Store);
  private route = inject(ActivatedRoute);

  type: 'category' | 'brands' = 'category';
  id!: string;
  name!: string; 

  products$!: Observable<Product[]>; 
  originalProducts: Product[] = []; 
  isLoading$!: Observable<boolean>;

  filterdCategory = signal<any>([]);
  filterdBrands = signal<any>([]);

  // Signal to hold filter values
  formFilterValues = signal<any>({});

  // Variable to track if products are available
  hasProducts = signal<boolean>(true);

  // Variable to track if the list is empty from the beginning
  isListEmpty = signal<boolean>(false);

  constructor() {
    // Get the category ID from the route
    this.route.paramMap.subscribe(params => {
      this.type = params.get('type') as 'category' | 'brands';
      this.id = params.get('id') || '';
      this.name = history.state.title || '';
    });

    // call the function to get the products
    this.fetchProducts();

    // Initialize originalProducts and filterdDataSend
    this.products$.subscribe((products) => {
      if (products && Array.isArray(products)) {
        this.originalProducts = [...products];
        this.filterdDataSend(products);
      }
    });

    // Check if the list is empty
    this.products$.subscribe((products) => {
      if (products && products.length === 0) {
        this.isListEmpty.set(true); 
      } else {
        this.isListEmpty.set(false); 
      }
    });
  }

  // load products by type
  fetchProducts(): void {  

    // Dispatch to products and loading states dynamically
    if (this.type === 'category') {
      this.store.dispatch(ProductsCategoryAction.loadProductsCategory({ categoryId: this.id }));
    } else if (this.type === 'brands') {
      this.store.dispatch(ProductsBrandAction.loadProductsBrand({ brandId: this.id }));
    }

    // Subscribe to products and loading states dynamically
    if (this.type === 'category') {
      this.products$ = this.store.select(selectProductCategory);
      this.isLoading$ = this.store.select(selectProductCategoryLaoding);
      
    } else if (this.type === 'brands') {
      this.products$ = this.store.select(selectProductBrand).pipe(map((products: any) => products.data));
      this.isLoading$ = this.store.select(selectProductBrandLaoding);
    }
  }

  // Filtered data send to filter lists
  filterdDataSend(products: Product[]) {
    // filter brands unique
    const brand = products.map((product) => product.brand.name);
    const brandUnique = [...new Set(brand)];
    this.filterdBrands.set(brandUnique);                

    // filter categories unique
    const category = products.map((product) => product.category.name);
    const categoryUnique = [...new Set(category)];
    this.filterdCategory.set(categoryUnique);                
  }

  // Handle filter values from child component
  onFormFilterValues(values: any): void {
    this.formFilterValues.set(values);
    this.applyFilters(values);
  }

  // Apply filters to products
  applyFilters(filterValues: any): void {
    let filteredProducts = [...this.originalProducts];

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
  }
}
