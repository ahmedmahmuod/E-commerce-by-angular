import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BrandsState } from './brands.state';

export const selectBrandsState = createFeatureSelector<BrandsState>('brands');

export const selectBrands = createSelector(
  selectBrandsState,
  state => state.brands
);

export const selectBrandsLoading = createSelector(
  selectBrandsState,
  state => state.loading
);

export const selectBrandsError = createSelector(
  selectBrandsState,
  state => state.error
);
