import { createAction, props } from '@ngrx/store';
import { WishlistResponse } from '../../core/models/wishlist/wishtlist.model';

export const loadUserWishlist = createAction('[User wishlist] Load User wishlist');

export const loadUserWishlistSuccess = createAction(
  '[User wishlist] Load User wishlist Success',
  props<{ wishlist: WishlistResponse }>()
);

export const loadUserWishlistSuccessFailure = createAction(
  '[User wishlist] Load User wishlist Failure',
  props<{ error: any }>()
);
