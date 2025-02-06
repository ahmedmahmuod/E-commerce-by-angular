import { createReducer, on } from '@ngrx/store';
import { initialState } from './user-wishlist.state';
import * as UserWishlistAction from './user-wishlist.action';

export const userWishlistReducer = createReducer(
  initialState,

  on(UserWishlistAction.loadUserWishlist, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(UserWishlistAction.loadUserWishlistSuccess, (state, { wishlist }) => ({
    ...state,
    loading: false,
    wishlist: Array.isArray(wishlist) ? wishlist : [wishlist],
  })),

  on(UserWishlistAction.loadUserWishlistSuccessFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
