import { createReducer, on } from '@ngrx/store';
import * as ProductsBrandsAction from './products-brand.action';
import { initialState } from './products-brand.state';

export const productsBrandReducer = createReducer(
  initialState,

  on(ProductsBrandsAction.loadProductsBrand, (state) => ({
    ...state,
    loading: true,
    error: null
  })),

  on(
    ProductsBrandsAction.loadProductsBrandSuccess, (state, { products }) => ({
      ...state,
      loading: false,
      products,
    })
  ),

  on(
    ProductsBrandsAction.loadProductsBrandFailure,
    (state, { error }) => ({
      ...state,
      loading: false,
      error,
    })
  )
);