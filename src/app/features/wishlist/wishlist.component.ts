import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from '../../shared/components/page-title/page-title.component';
import { AddToCartComponent } from '../../shared/components/buttons/add-to-cart/add-to-cart.component';
import { distinctUntilChanged, filter, finalize, map, Observable, of, shareReplay, Subject, switchMap, take, takeUntil, tap } from 'rxjs';
import { WishlistResponse } from '../../core/models/wishlist/wishtlist.model';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';
import { Product } from '../../core/models/product/product.model';
import { CartsService } from '../../shared/services/carts/carts.service';
import { SpinnerComponent } from "../../shared/components/spinner/spinner.component";
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { Router, RouterLink } from '@angular/router';
import { TokenService } from '../../core/services/user/services/token.service';
import { loadUserWishlist, loadUserWishlistSuccess } from '../../stores/wishlist-store/user-wishlist.action';
import { Store } from '@ngrx/store';
import { selectUserWishlist, selectWishlist, selectWishlistLoading } from '../../stores/wishlist-store/user-wishlist.selector';
import { TranslateModule } from '@ngx-translate/core';
import { ViewProductComponent } from "../../shared/components/buttons/view-product/view-product.component";
import { LanguageService } from '../../core/services/language.service';

@Component({
    selector: 'app-wishlist',
    imports: [CommonModule, PageTitleComponent, AddToCartComponent, SpinnerComponent, ButtonModule, ToastModule, RouterLink, TranslateModule, ViewProductComponent],
    templateUrl: './wishlist.component.html',
    styleUrl: './wishlist.component.css',
    providers: [MessageService, CartsService]
})
export class WishlistComponent implements OnInit {
  // Private variables
  private cartsService = inject(CartsService);
  private tokenService = inject(TokenService)
  private WishlistService = inject(WishlistService)
  private router = inject(Router);
  private store = inject(Store);
  private destroy$ = new Subject<void>();
  private meassageService = inject (MessageService)
  private langService = inject(LanguageService);

  // Public variables
  wishlistItems$!: Observable<WishlistResponse>; 
  loading$!: Observable<boolean>; 
  isLoggedIn = false;
  currentLang$!: Observable<string>;

  ngOnInit(): void {
    this.loadWishlist();    

    this.langService.currentLanguage$.subscribe((lang) => {
      this.currentLang$ = of(lang)  
    })
  }

  // Load wishlist from store
  loadWishlist() {
      if (this.isLoggedIn) return;
      this.tokenService.isLoggedIn$.pipe(takeUntil(this.destroy$),tap((log) => {
        this.isLoggedIn = log;
        // Load wishlist from store if user is logged in
        if (log) {
          this.store.dispatch(loadUserWishlist());
        }
      }),
      filter(log => log),
      switchMap(() => {
        this.wishlistItems$ = this.store.select(selectUserWishlist).pipe(map(res => res.wishlist[0]), shareReplay(1));
        this.loading$ = this.store.select(selectWishlistLoading).pipe(distinctUntilChanged(),shareReplay(1));
        return this.loading$;
      })).subscribe();
  }

  // add to cart 
  addToCart(product: Product) {
    this.loading$ = this.cartsService.isLoading$;
    this.cartsService.addProductToCart(product);
  }

  // View product details page 
  viewProduct(product: any) {
    const productId = product.id;    
    this.router.navigate(['wishlist',productId,'details']);
  }

  // remove product from wishlist
  removeProductWishlist(product: any) {
    this.loading$ = of(true);
    const productId = product.id;

    let lang: string = 'en'; 
    this.currentLang$.subscribe((value) => lang = value); 

    this.WishlistService.removeWishlistItem(productId).pipe(
      takeUntil(this.destroy$),
      finalize(() => this.loading$ = of(false)),
      switchMap(() => this.store.select(selectWishlist).pipe(take(1))) // استخدام switchMap بدلًا من subscribe مباشرة
    ).subscribe({
      next: (wishlist) => {
        if (wishlist && wishlist.length > 0) {
          const updatedWishlist: WishlistResponse = {
            status: 'success',
            count: Math.max(wishlist[0].data.length - 1, 0),
            data: wishlist[0].data.filter(item => item._id !== productId)
          };
  
          this.store.dispatch(loadUserWishlistSuccess({ wishlist: updatedWishlist }));
        }
  

        if (lang === 'en') {
          this.meassageService.add({ severity: 'success', summary: 'Success', detail: 'Item deleted successfully' });
        } else {
          this.meassageService.add({ severity: 'success', summary: 'تم بنجاح', detail: 'تم حذف المنتج من القائمة المفضله بنجاح' });
        }
      },
      error: (error) => {
        this.meassageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
      }
    });
  }
}
