import { createReducer, on } from '@ngrx/store';
import * as ProductsCategoryAction from './products-category.action';
import { initialState } from './products-category.state';

export const productsCategoryReducer = createReducer(
  initialState,

  on(ProductsCategoryAction.loadProductsCategory, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(
    ProductsCategoryAction.loadProductsCategorySuccess, (state, { products }) => ({
      ...state,
      loading: false,
      products,
    })
  ),

  on(
    ProductsCategoryAction.loadProductsCategoryFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })
  )
);