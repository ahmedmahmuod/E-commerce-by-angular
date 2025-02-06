import { createReducer, on } from '@ngrx/store';
import { initialState } from './user-carts.state';
import * as UserCartsAction from './user-carts.action';

export const userCartsReducer = createReducer(
  initialState,

  on(UserCartsAction.loadUserCarts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),

  on(UserCartsAction.loadUserCartsSuccess, (state, { carts }) => ({
    ...state,
    loading: false,
    carts: Array.isArray(carts) ? carts : [carts],
  })),

  on(UserCartsAction.loadUserCartsSuccessFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
