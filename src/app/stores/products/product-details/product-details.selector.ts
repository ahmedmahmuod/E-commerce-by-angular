import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductDetailsState } from './product-details.state';

export const selectProductDetailsState = createFeatureSelector<ProductDetailsState>('productDetails');

export const selectProductDetails = createSelector(
    selectProductDetailsState,
  state => state.product
);

export const selectProductDetailsLaoding = createSelector(
    selectProductDetailsState,
  state => state.loading
);

export const selectProductDetailsError = createSelector(
    selectProductDetailsState,
  state => state.error
);