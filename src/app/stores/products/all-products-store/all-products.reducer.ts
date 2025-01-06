import { createReducer, on } from '@ngrx/store';
import { initialState } from './all-products.state';
import * as AllProductsAction from './all-products.action';

export const allProductsReducer = createReducer(
  initialState,

  on(AllProductsAction.loadAllProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(AllProductsAction.loadAllProductsSuccess, (state, { products }) => ({
    ...state,
    loading: false,
    products,
  })),

  on(AllProductsAction.loadAllProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
