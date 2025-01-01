import { createReducer, on } from '@ngrx/store';
import * as CategoriesActions from './categories.actions';
import { initialState } from './categories.state';

export const categoriesReducer = createReducer(
  initialState,
  on(CategoriesActions.loadCategories, (state) => ({ ...state, loading: true })),
  on(CategoriesActions.loadCategoriesSuccess, (state, { categories }) => ({
    ...state,
    loading: false,
    categories,
    error: null,
  })),
  on(CategoriesActions.loadCategoriesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
