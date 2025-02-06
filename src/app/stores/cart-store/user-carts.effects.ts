import { CartResponse } from './../../core/models/cart/cart.model';
import { CartService } from './../../core/services/cart/cart.service';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserCartsAction from './user-carts.action';
import { of } from 'rxjs';

@Injectable()
export class UserCartsEffects {
  private actions$ = inject(Actions);
  private cartsService = inject(CartService);

  loadUserCarts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserCartsAction.loadUserCarts),
      mergeMap(() =>
        this.cartsService.getUserCart().pipe(
          map((carts) =>
            UserCartsAction.loadUserCartsSuccess({ carts })
          ),
          catchError((error) =>
            of(UserCartsAction.loadUserCartsSuccessFailure({ error }))
          )
        )
      )
    )
  );
}
