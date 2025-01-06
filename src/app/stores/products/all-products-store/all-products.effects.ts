import { catchError, map, mergeMap } from 'rxjs/operators';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ProductsService } from '../../../core/services/products/products.service';
import * as AllProductsAction from './all-products.action';
import { of } from 'rxjs';

@Injectable()
export class AllProductsEffects {
  private actions$ = inject(Actions);
  private productsService = inject(ProductsService);

  loadAllProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AllProductsAction.loadAllProducts),
      mergeMap(() =>
        this.productsService.getAllProducts().pipe(
          map((products) =>
            AllProductsAction.loadAllProductsSuccess({ products })
          ),
          catchError((error) =>
            of(AllProductsAction.loadAllProductsFailure({ error }))
          )
        )
      )
    )
  );
}
