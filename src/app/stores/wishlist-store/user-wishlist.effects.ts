import { catchError, map, mergeMap } from 'rxjs/operators';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as UserWishlistAction from './user-wishlist.action';
import { of } from 'rxjs';
import { WishlistService } from '../../core/services/wishlist/wishlist.service';

@Injectable()
export class UserWishlistEffects {
  private actions$ = inject(Actions);
  private wishlistService = inject(WishlistService);

  loadUserWishlist$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserWishlistAction.loadUserWishlist),
      mergeMap(() =>
        this.wishlistService.getUserWishlist().pipe(
          map((wishlist) =>
            UserWishlistAction.loadUserWishlistSuccess({ wishlist })
          ),
          catchError((error) =>
            of(UserWishlistAction.loadUserWishlistSuccessFailure({ error }))
          )
        )
      )
    )
  );
}
