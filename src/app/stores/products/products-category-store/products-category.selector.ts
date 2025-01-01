import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsCategoryState } from './products-category.state';

export const selectProductsCategory = createFeatureSelector<ProductsCategoryState>('productsCategory');

export const selectProductCategory = createSelector(
  selectProductsCategory,
  state => state.products
);

export const selectProductCategoryLaoding = createSelector(
  selectProductsCategory,
  state => state.loading
);

export const selectProductCategoryError = createSelector(
  selectProductsCategory,
  state => state.error
);
