import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';

// Import the store and effects functions
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

// Import the reducers
import { brandsReducer } from './stores/brands-store/brands.reducer';

// Import the effects
import { BrandsEffects } from './stores/brands-store/brands.effects';
import { categoriesReducer } from './stores/categories-store/categories.reducer';
import { CategoriesEffects } from './stores/categories-store/categories.effects';
import { productsCategoryReducer } from './stores/products/products-category-store/products-category.reducer';
import { ProductsCategoryEffects } from './stores/products/products-category-store/products-category.effects';

registerLocaleData(en);
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore({
      brands: brandsReducer,
      categories: categoriesReducer,
      productsCategory: productsCategoryReducer,
    }),
    provideEffects([BrandsEffects, CategoriesEffects, ProductsCategoryEffects]),
    provideStoreDevtools({ maxAge: 25 }),

    importProvidersFrom(BrowserAnimationsModule),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),

    provideHttpClient(),
    ...TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }).providers!,
    provideNzI18n(en_US),
    importProvidersFrom(FormsModule),
    provideAnimationsAsync(),
    provideHttpClient(),
  ],
};
