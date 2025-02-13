import {
  ApplicationConfig,
  provideZoneChangeDetection, isDevMode,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { authInterceptor } from './core/services/user/interceptors/auth.interceptor';
import { HeartOutline, ShoppingCartOutline, MenuOutline } from '@ant-design/icons-angular/icons';

import { routes } from './app.routes';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

// Import the store and effects functions
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

// Import the reducers
import { brandsReducer } from './stores/brands-store/brands.reducer';
import { categoriesReducer } from './stores/categories-store/categories.reducer';
import { productsCategoryReducer } from './stores/products/products-category-store/products-category.reducer';
import { productsDetailsReducer } from './stores/products/product-details/product-details.reducer';
import { productsBrandReducer } from './stores/products/products-brand-store/products-brand.reducer';
import { allProductsReducer } from './stores/products/all-products-store/all-products.reducer';
import { ordersReducer } from './stores/user/orders/orders.reducer';
import { userCartsReducer } from './stores/cart-store/user-carts.reducer';
import { userWishlistReducer } from './stores/wishlist-store/user-wishlist.reducer';

// Import the effects
import { BrandsEffects } from './stores/brands-store/brands.effects';
import { CategoriesEffects } from './stores/categories-store/categories.effects';
import { ProductsCategoryEffects } from './stores/products/products-category-store/products-category.effects';
import { ProductDetailsEffects } from './stores/products/product-details/product-details.effects';
import { AllProductsEffects } from './stores/products/all-products-store/all-products.effects';
import { ProductsBrandEffects } from './stores/products/products-brand-store/products-brand.effects';
import { OrdersEffects } from './stores/user/orders/orders.effects';
import { UserCartsEffects } from './stores/cart-store/user-carts.effects';
import { UserWishlistEffects } from './stores/wishlist-store/user-wishlist.effects';
import { provideClientHydration } from '@angular/platform-browser';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { provideServiceWorker } from '@angular/service-worker';

registerLocaleData(en);
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({
      brands: brandsReducer,
      productsBrand: productsBrandReducer,
      categories: categoriesReducer,
      productsCategory: productsCategoryReducer,
      productDetails: productsDetailsReducer,
      allProducts: allProductsReducer,
      orders: ordersReducer,
      userCarts: userCartsReducer,
      userWishlist: userWishlistReducer,
    }),
    provideEffects([
      BrandsEffects,
      ProductsBrandEffects,
      CategoriesEffects,
      ProductsCategoryEffects,
      ProductDetailsEffects,
      AllProductsEffects,
      OrdersEffects,
      UserCartsEffects,
      UserWishlistEffects,
    ]),
    provideStoreDevtools({ maxAge: 25 }),

    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),

    provideHttpClient(
      withInterceptors([authInterceptor]),
      withFetch()
    ),
    provideNzIcons( [HeartOutline, ShoppingCartOutline, MenuOutline]),

    ...TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }).providers!, provideClientHydration(), provideServiceWorker('ngsw-worker.js', {
            enabled: !isDevMode(),
            registrationStrategy: 'registerWhenStable:30000'
          })
  ],
};
