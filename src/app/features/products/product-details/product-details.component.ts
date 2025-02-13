import { selectProductDetailsLaoding } from './../../../stores/products/product-details/product-details.selector';
import { ImageSliderComponent } from './../../../shared/components/image-slider/image-slider.component';
import { AddToCartComponent } from './../../../shared/components/buttons/add-to-cart/add-to-cart.component';
import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, map, Observable, of, Subject, take } from 'rxjs';
import { selectProductDetails } from '../../../stores/products/product-details/product-details.selector';
import { SpinnerComponent } from '../../../shared/components/spinner/spinner.component';
import * as ProductsDetailsAction from '../../../stores/products/product-details/product-details.actions';
import { Product } from '../../../core/models/product/product.model';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { CartsService } from '../../../shared/services/carts/carts.service';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../core/services/language.service';

@Component({
    selector: 'app-product-details',
    standalone: true,
    imports: [
        CommonModule,
        ImageSliderComponent,
        AddToCartComponent,
        SpinnerComponent,
        ButtonModule,
        ToastModule,
        TranslateModule
    ],
    templateUrl: './product-details.component.html',
    styleUrl: './product-details.component.css',
    providers: [MessageService, CartsService]
})
export class ProductDetailsComponent implements OnDestroy {
  private route = inject(ActivatedRoute);
  private store = inject(Store);
  private unsubscribe$ = new Subject<void>();
  private cartsService = inject(CartsService);

  product$!: Observable<any>;
  isLoading$: Observable<boolean>;
  showSpinner$!: Observable<boolean>;
  currentLang$!: Observable<string>;

  constructor(private langService: LanguageService) {    
    this.langService.currentLanguage$.subscribe((lang) => {
      this.currentLang$ = of(lang)  
    })

    // Get the product id from the route
    this.route.paramMap.subscribe((params) => {
      const productId = params.get('productId');

      if (productId) {
        this.store
          .select(selectProductDetails)
          .pipe(take(1))
          .subscribe((product) => {
            if (!product || this.isDifferentProduct(product, productId)) {
              this.store.dispatch(
                ProductsDetailsAction.loadProductDetails({ productId })
              );
            }
          });
      }
    });

    this.product$ = this.store.select(selectProductDetails);
    this.isLoading$ = this.store.select(selectProductDetailsLaoding);

    this.showSpinner$ = combineLatest([this.product$, this.isLoading$]).pipe(
      map(([product, isLoading]) => !product && isLoading)
    );
  }

  //  Check if the category has changed
  private isDifferentProduct(product: any, productId: string): boolean {
    return product._id !== productId;
  }

  // Get full stars
  getFullStars(ratingsAverage: number): number[] {
    if (
      ratingsAverage === undefined ||
      ratingsAverage === null ||
      ratingsAverage < 0
    ) {
      return [];
    }
    const fullStars = Math.floor(ratingsAverage);
    return Array(fullStars).fill(0);
  }

  // Check if the product has a half star
  hasHalfStar(ratingsAverage: number): boolean {
    if (
      ratingsAverage === undefined ||
      ratingsAverage === null ||
      ratingsAverage < 0
    ) {
      return false;
    }
    const fraction = ratingsAverage - Math.floor(ratingsAverage);
    return fraction >= 0.5;
  }

  // Get empty stars
  getEmptyStars(ratingsAverage: number): number[] {
    if (
      ratingsAverage === undefined ||
      ratingsAverage === null ||
      ratingsAverage < 0
    ) {
      return Array(5).fill(0);
    }
    const fullStars = Math.floor(ratingsAverage);
    const totalStars = 5;
    const emptyStars =
      totalStars - fullStars - (this.hasHalfStar(ratingsAverage) ? 1 : 0);
    return Array(emptyStars).fill(0);
  }

  // add to cart 
  addToCart(product: Product) {
    this.isLoading$ = this.cartsService.isLoading$;
    this.cartsService.addProductToCart(product);
  }
  
  // on destroy
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
