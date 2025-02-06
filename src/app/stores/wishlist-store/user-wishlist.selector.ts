import { createFeatureSelector, createSelector } from '@ngrx/store';
import { WishlistState } from './user-wishlist.state';

export const selectUserWishlist = createFeatureSelector<WishlistState>('userWishlist');

export const selectWishlist = createSelector(
  selectUserWishlist,
  (state) => state.wishlist
);

export const selectWishlistLoading = createSelector(
  selectUserWishlist,
  (state) => state.loading
);

export const selectWishlistError = createSelector(
  selectUserWishlist,
  (state) => state.error
);
