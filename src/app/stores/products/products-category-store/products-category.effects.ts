import { ProductsService } from './../../../core/services/products/products.service';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as ProductsCategoryAction from './products-category.action';

@Injectable()
export class ProductsCategoryEffects {
  private actions$ = inject(Actions);
  private productCategoryService = inject(ProductsService);

  loadProductsCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductsCategoryAction.loadProductsCategory),
      mergeMap((action) =>
        this.productCategoryService.getProductsByCategory(action.categoryId).pipe(
          map((products) => ProductsCategoryAction.loadProductsCategorySuccess({ products })),
          catchError((error) => of(ProductsCategoryAction.loadProductsCategoryFailure({ error })))
        )
      )
    )
  );

}