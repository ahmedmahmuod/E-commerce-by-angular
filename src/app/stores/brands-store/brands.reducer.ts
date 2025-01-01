import { createReducer, on } from '@ngrx/store';
import * as BrandsActions from './brands.actions';
import { initialState } from './brands.state';

export const brandsReducer = createReducer(
  initialState,
  on(BrandsActions.loadBrands, (state) => ({ ...state, loading: true })),
  on(BrandsActions.loadBrandsSuccess, (state, { brands }) => ({
    ...state,
    loading: false,
    brands,
    error: null,
  })),
  on(BrandsActions.loadBrandsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
