import { CategoriesService } from './../../core/services/categories/categories.service';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as CategoriesActions from './categories.actions';

@Injectable()
export class CategoriesEffects {
  private actions$ = inject(Actions);
  private categoriesService = inject(CategoriesService);

  loadCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoriesActions.loadCategories),
      mergeMap(() =>
        this.categoriesService.getCategories().pipe(
          map((categories) => CategoriesActions.loadCategoriesSuccess({ categories })),
          catchError((error) => of(CategoriesActions.loadCategoriesFailure({ error })))
        )
      )
    )
  );
}
