import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewProductComponent } from './../../shared/components/buttons/view-product/view-product.component';
import { PageTitleComponent } from '../../shared/components/page-title/page-title.component';
import { TokenService } from '../../core/services/user/services/token.service';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadUserCarts, loadUserCartsSuccess } from '../../stores/cart-store/user-carts.action';
import { distinctUntilChanged, filter, finalize, map, Observable, of, shareReplay, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { CartResponse } from '../../core/models/cart/cart.model';
import { selectCartsLoading, selectUserCarts } from '../../stores/cart-store/user-carts.selector';
import { SpinnerComponent } from "../../shared/components/spinner/spinner.component";
import { CartService } from '../../core/services/cart/cart.service';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../core/services/language.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, ViewProductComponent, PageTitleComponent, ButtonModule, ToastModule, RouterLink, SpinnerComponent, TranslateModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
  providers: [MessageService]
})
export class CartComponent implements OnInit, OnDestroy {
  // private variables
  private destroy$ = new Subject<void>();
  private cartsService = inject(CartService);
  private router = inject(Router);
  private langService = inject(LanguageService);

  constructor(
    private tokenService: TokenService,
    private meassageService: MessageService,
    private store: Store
  ) {}

  // Variables
  cartItems$!: Observable<CartResponse>; 
  loading$!: Observable<boolean>; 
  isLoggedIn = false;
  currentLang$!: Observable<string>;

  ngOnInit(): void {
    this.loadCart();
    this.langService.currentLanguage$.subscribe((lang) => {
      this.currentLang$ = of(lang)  
    })
  }

// Load carts from store
loadCart() {
  if (this.isLoggedIn) return;
  this.tokenService.isLoggedIn$.pipe(takeUntil(this.destroy$),tap((log) => {
        this.isLoggedIn = log;
        // Load carts from store if user is logged in
        if (log) {
          this.store.dispatch(loadUserCarts());
        }
      }),
      filter(log => log),
      switchMap(() => {
        this.cartItems$ = this.store.select(selectUserCarts).pipe(map(res => res.carts[0]), shareReplay(1));
        this.loading$ = this.store.select(selectCartsLoading).pipe(distinctUntilChanged(),shareReplay(1));
        return this.loading$;
      })).subscribe();
}


// Increase and decrease product quantity
inDeQuantity(item: any, count: any): void {
  const productId = item.product.id;
  this.loading$ = of(true);
  
  let lang: string = 'en'; 
  this.currentLang$.subscribe((value) => lang = value); 

  // Update product quantity
  this.cartsService.updateProductQuantity(productId, count).pipe(
    takeUntil(this.destroy$),
    finalize(() => this.loading$ = of(false))
  ).subscribe({
    // if success update the store 
    next: (res) => {
      this.store.dispatch(loadUserCartsSuccess({ carts: res }));
      if (lang === 'en') {
        this.meassageService.add({ severity: 'success', summary: 'Success', detail: 'Item quantity updated successfully' });
      } else {
        this.meassageService.add({ severity: 'success', summary: 'تم بنجاح', detail: 'تم تحديث كمية العنصر بنجاح' });
      }
    },
    // if error show error message
    error: (error) => {
      this.meassageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
    }
  });
}

  // Calculate total price based on updated quantities
  calculateTotal(products: any[]): number {
    return products.reduce((total, item) => total + item.price * item.count, 0);
  }

  // View product details page 
  viewProduct(product: any) {
    const productId = product.product.id;
    this.router.navigate(['cart',productId,'details']);
  }
  
  // Delete product from cart
  deleteProductCart (product: any) {
    this.loading$ = of(true);
    const productId = product.product.id;

    let lang: string = 'en'; 
    this.currentLang$.subscribe((value) => lang = value); 
  
    this.cartsService.deleteProductFromCart(productId).pipe(
      takeUntil(this.destroy$),
      finalize(() => this.loading$ = of(false))
    ).subscribe({
      next: (res) => {
        this.store.dispatch(loadUserCartsSuccess({ carts: res }));
        if (lang === 'en') {
          this.meassageService.add({ severity: 'success', summary: 'Success', detail: 'Item deleted successfully' });
        } else {
          this.meassageService.add({ severity: 'success', summary: 'تم بنجاح', detail: 'تم حذف العنصر من السلة الخاصه بك بنجاح' });
        }
      },
      error: (error) => {
        this.meassageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
      }
    });
  }

  // on destroy the subscription
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}