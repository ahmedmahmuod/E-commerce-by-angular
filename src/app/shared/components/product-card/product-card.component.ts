import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { BehaviorSubject, Observable, of, Subject, takeUntil } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { SpinnerComponent } from "../spinner/spinner.component";
import { Product } from '../../../core/models/product/product.model';
import { CartsService } from '../../services/carts/carts.service';
import { WishlistService } from '../../../core/services/wishlist/wishlist.service';
import { TokenService } from '../../../core/services/user/services/token.service';
import { Store } from '@ngrx/store';
import { loadUserWishlist } from '../../../stores/wishlist-store/user-wishlist.action';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../core/services/language.service';

@Component({
    selector: 'app-product-card',
    imports: [CommonModule, RouterLink, ButtonModule, ToastModule, SpinnerComponent, TranslateModule],
    templateUrl: './product-card.component.html',
    styleUrl: './product-card.component.css',
    providers: [MessageService, CartsService]
})
export class ProductCardComponent {
  private router = inject(Router);
  private cartsService = inject(CartsService);
  private wishlistService = inject(WishlistService);
  private tokenService = inject(TokenService);
  private unsubscribe$ = new Subject<void>();
  private messageService = inject(MessageService);
  private store = inject(Store);
  private langService = inject (LanguageService);

  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable(); 
  currentLang$!: Observable<string>;

  @Input({ required: true }) products!: any;

  constructor () {
    this.langService.currentLanguage$.subscribe((lang) => {
      this.currentLang$ = of(lang)  
    })
  }

  // Btn to Add wishlist page
  addToWishlist(product: any): void {
    let lang: string = 'en'; 
    this.currentLang$.subscribe((value) => lang = value); 

    const productId = product.id
    this.tokenService.isLoggedIn$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((logged) => {
        if (logged) {
          this.isLoadingSubject.next(true); 
          this.wishlistService.addWishlistItem(productId)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe({
            next: () => {
              this.isLoadingSubject.next(false);
              this.store.dispatch(loadUserWishlist())
              if (lang === 'en') {
                this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added to wishlist' });
              } else {
                this.messageService.add({ severity: 'success', summary: 'تم بنجاح', detail: 'تم اضافة المنتج لـ قائمة المنتجات المفضله' });
              }
            },

            error: (error) => {
              this.isLoadingSubject.next(false);
              this.messageService.add({ severity: 'error', summary: 'Error', detail: error.errors.message });
            }
          })
        } else {
          if (lang === 'en') {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'You must be logged in to add product to wishlist' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'حدث خطأ', detail: 'يجب عليك تسجيل الدخول أولاً لإضافة المنجات للقائمة المفضله' });
          }
        }
      })
  }

  // Btn Add Product to cart
  addToCart(product: Product) {
    this.isLoading$ = this.cartsService.isLoading$;
    this.cartsService.addProductToCart(product);
  }

  // view product details
  viewProduct(product: any) {
    this.router.navigate(['product',product._id,'details']);
  }


}
