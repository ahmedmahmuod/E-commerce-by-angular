import { ProductsService } from './../../../core/services/products/products.service';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ProductsBrandAction from './products-brand.action';

@Injectable()
export class ProductsBrandEffects {
  private actions$ = inject(Actions);
  private productService = inject(ProductsService);

  loadProductsBrand$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsBrandAction.loadProductsBrand),
      mergeMap((action) =>
        this.productService.getProductsByBrand(action.brandId).pipe(
          map((products) => ProductsBrandAction.loadProductsBrandSuccess({ products })),
          catchError((error) => of(ProductsBrandAction.loadProductsBrandFailure({ error })))
        )
      )
    )
  );

}