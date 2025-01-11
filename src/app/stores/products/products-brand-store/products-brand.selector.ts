import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsBrandState } from './products-brand.state';

export const selectProductsBrands = createFeatureSelector<ProductsBrandState>('productsBrand');

export const selectProductBrand = createSelector(
  selectProductsBrands,
  state => state.products
);

export const selectProductBrandLaoding = createSelector(
  selectProductsBrands,
  state => state.loading
);

export const selectProductBrandError = createSelector(
  selectProductsBrands,
  state => state.error
);
