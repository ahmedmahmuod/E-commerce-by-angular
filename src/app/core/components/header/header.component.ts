import { Component, signal, HostListener, inject, OnInit, Output, EventEmitter, PLATFORM_ID } from '@angular/core';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import {  trigger, state, style, transition, animate } from '@angular/animations';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { TokenService } from '../../services/user/services/token.service';
import { UserService } from '../../services/user/services/user.service';
import { combineLatest, Observable, of, Subject, switchMap, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectCarts } from '../../../stores/cart-store/user-carts.selector';
import { loadUserCarts } from '../../../stores/cart-store/user-carts.action';
import { loadUserWishlist } from '../../../stores/wishlist-store/user-wishlist.action';
import { selectWishlist } from '../../../stores/wishlist-store/user-wishlist.selector';
import { TranslateService } from '@ngx-translate/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        TranslateModule,
        FormsModule,
        NzIconModule,
        NzRateModule,
        NzSelectModule,
        NzIconModule,
        NzToolTipModule,
        CommonModule,
        RouterLink,
        NzDropDownModule,
        NzIconModule,
        RouterLinkActive,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    animations: [
        trigger('headerAnimation', [
            state('void', style({
                transform: 'translateY(-100%)',
                opacity: 0,
            })),
            state('*', style({
                transform: 'translateY(0)',
                opacity: 1,
            })),
            transition('void => *', [animate('300ms ease-out')]),
            transition('* => void', [animate('300ms ease-in')]),
        ]),
        trigger('slideAnimation', [
            state('void', style({
                transform: 'translateX(-100%)',
                opacity: 0,
            })),
            state('*', style({
                transform: 'translateX(0)',
                opacity: 1,
            })),
            transition('void => *', [animate('300ms ease-out')]),
            transition('* => void', [animate('300ms ease-in')]),
        ]),
    ]
})
export class HeaderComponent implements OnInit{
  private tokenService = inject(TokenService);
  private userService = inject(UserService);
  private store = inject(Store);
  private destroy$ = new Subject<void>();
  private langService = inject(LanguageService);
  private platformId = inject(PLATFORM_ID);

  isMenuOpen: boolean = false;
  isHeaderVisible = true;
  isLogged = signal<boolean>(false);
  userData$: Observable<any> = of(null);
  cartCount$!: Observable<number>
  wishlistCount$!: Observable<number>
  currentLang$!: Observable<string>;

  selectedLanguage = signal<string>('en');
  @Output() languageChanged = new EventEmitter<string>();

  constructor(private translate: TranslateService) {
    if (isPlatformBrowser(this.platformId)) {
      const savedLang = localStorage.getItem('language');
      if (savedLang) {
        this.selectedLanguage.set(savedLang);
        translate.use(savedLang);
      } else {
        translate.use('en');
      }
    }
  }

  switchLanguage(language: string): void {
    this.langService.switchLanguage(language);
    this.languageChanged.emit(language); 
  }
  
  ngOnInit() {    
    this.langService.currentLanguage$.subscribe((lang) => {
      this.currentLang$ = of(lang)  
    })

    // Subscribe to the logged-in status
    this.tokenService.isLoggedIn$.pipe(
      takeUntil(this.destroy$),
      switchMap((loggedIn) => {
        this.isLogged.set(loggedIn);
  
        if (loggedIn) {
          this.store.dispatch(loadUserCarts());
          this.store.dispatch(loadUserWishlist());
  
          return combineLatest([
            this.store.select(selectCarts),
            this.store.select(selectWishlist)
          ]);
        } else {
          return of([[], []]);
        }
      })
    ).subscribe(([carts, wishlist]) => {
      this.cartCount$ = of(carts[0]?.data.products.length || 0);
      this.wishlistCount$ = of(wishlist[0]?.data.length || 0);
    });
  
    // Subscribe to user data
    this.userService.userData$.pipe(
      takeUntil(this.destroy$)
    ).subscribe(data => {
      this.userData$ = of(data ? (data.data || null) : null);
    });
  
    // Subscribe to cart changes
    this.store.select(selectCarts).pipe(
      takeUntil(this.destroy$)
    ).subscribe(carts => {
      this.cartCount$ = of(carts[0]?.data.products.length || 0);
    });
  
    // Subscribe to wishlist changes
    this.store.select(selectWishlist).pipe(
      takeUntil(this.destroy$)
    ).subscribe(wishlist => {
      this.wishlistCount$ = of(wishlist[0]?.data.length || 0);
    });
  }
  
  // on toggel on the menu
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  // hostlistener is working here
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const menu = document.querySelector('.mobile-menu') as HTMLElement;
    const menuIcon = document.querySelector('.menu-icon') as HTMLElement;

    if (this.isMenuOpen && menu && menuIcon && !menu.contains(target) && !menuIcon.contains(target)) {
      this.isMenuOpen = false;
    }
  }

  // Logout user
  logOut() {
    this.tokenService.removeToken();
  }
}