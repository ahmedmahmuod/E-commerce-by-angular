import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './all-products.state';

export const selectProducts =
  createFeatureSelector<ProductsState>('allProducts');

export const selectAllProducts = createSelector(
  selectProducts,
  (state) => state.products
);

export const selectAllProductsLoading = createSelector(
  selectProducts,
  (state) => state.loading
);

export const selectAllProductError = createSelector(
  selectProducts,
  (state) => state.error
);
