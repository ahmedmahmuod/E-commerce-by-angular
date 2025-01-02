import { createReducer, on } from '@ngrx/store';
import * as ProductsDetailsAction from './product-details.actions';
import { initialState } from './product-details.state';

export const productsDetailsReducer = createReducer(
  initialState,

  on(ProductsDetailsAction.loadProductDetails, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(ProductsDetailsAction.loadProductDetailsSuccess, (state, { product }) => ({
    ...state,
    loading: false,
    product,
  })),

  on(ProductsDetailsAction.loadProductDetailsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
