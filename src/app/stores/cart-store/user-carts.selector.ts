import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartsState } from './user-carts.state';

export const selectUserCarts = createFeatureSelector<CartsState>('userCarts');

export const selectCarts = createSelector(
  selectUserCarts,
  (state) => state.carts
);

export const selectCartsLoading = createSelector(
  selectUserCarts,
  (state) => state.loading
);

export const selectCartsError = createSelector(
  selectUserCarts,
  (state) => state.error
);
