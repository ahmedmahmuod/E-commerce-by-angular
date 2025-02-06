import { inject, Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { BehaviorSubject, Observable, of, Subject, takeUntil } from "rxjs";
import { CartService } from "../../../core/services/cart/cart.service";
import { TokenService } from "../../../core/services/user/services/token.service";
import { MessageService } from "primeng/api";
import { loadUserCartsSuccess } from "../../../stores/cart-store/user-carts.action";
import { LanguageService } from "../../../core/services/language.service";

// CartsService Service
@Injectable({
  providedIn: 'root',
})
export class CartsService {
  private cartService = inject(CartService);
  private tokenService = inject(TokenService);
  private messageService = inject(MessageService);
  private unsubscribe$ = new Subject<void>();
  private store = inject(Store);

  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  isLoading$ = this.isLoadingSubject.asObservable(); 
  currentLang$!: Observable<string>;

  constructor(private langService: LanguageService) {
    this.langService.currentLanguage$.subscribe((lang) => {
      this.currentLang$ = of(lang)  
    })

  }
  
  // add product to cart
  addProductToCart(product: any) {
    let lang: string = 'en'; 
    this.currentLang$.subscribe((value) => lang = value); 


    this.tokenService.isLoggedIn$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        if (res) {
          this.isLoadingSubject.next(true); 
          this.cartService.addProductToCart(product._id)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe({
              next: (cartResponse) => {
                this.isLoadingSubject.next(false); 
                this.store.dispatch(loadUserCartsSuccess({ carts: cartResponse }));
                if (lang === 'en') {
                  this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product Added To Cart' });
                } else {
                  this.messageService.add({ severity: 'success', summary: 'تم بنجاح', detail: 'تم اضافة المنتج الي السلة بنجاح' });
                }
              },
              error: (err) => {
                this.isLoadingSubject.next(false);
                this.messageService.add({ severity: 'error', summary: 'Error', detail: err.error.message });
              },
            });
        } else {
          if (lang === 'en') {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'You Must Be Logged In To Add Product To Cart' });
          } else {
            this.messageService.add({ severity: 'error', summary: 'حدث خطأ', detail: 'يجب عليك تسجيل الدخول أولاً لاضافة المنتج الي السلة' });
          }
        }
      });
  }
}
