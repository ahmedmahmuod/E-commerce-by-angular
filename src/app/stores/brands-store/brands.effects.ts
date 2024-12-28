import { BrandsService } from './../../core/services/brands/brands.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as BrandsActions from './brands.actions';

@Injectable()
export class BrandsEffects {
  constructor(private actions$: Actions, private brandsService: BrandsService) {}

  loadBrands$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BrandsActions.loadBrands),
      mergeMap(() =>
        this.brandsService.getAllBrands().pipe(
          map(brands => BrandsActions.loadBrandsSuccess({ brands })),
          catchError(error => of(BrandsActions.loadBrandsFailure({ error })))
        )
      )
    )
  );
}
