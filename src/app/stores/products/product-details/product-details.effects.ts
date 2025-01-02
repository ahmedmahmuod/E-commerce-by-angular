import { ProductsService } from './../../../core/services/products/products.service';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ProductsDetailsAction from './product-details.actions';

@Injectable()
export class ProductDetailsEffects {
  private actions$ = inject(Actions);
  private productService = inject(ProductsService);

  loadProductsDetails$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsDetailsAction.loadProductDetails),
      mergeMap((action) =>
        this.productService.getProductById(action.productId).pipe(
          map((product) => ProductsDetailsAction.loadProductDetailsSuccess({ product })),
          catchError((error) => of(ProductsDetailsAction.loadProductDetailsFailure({ error })))
        )
      )
    )
  );
}
