import { createAction, props } from '@ngrx/store';

export const loadBrands = createAction('[Brands] Load Brands');
export const loadBrandsSuccess = createAction(
  '[Brands] Load Brands Success',
  props<{ brands: any[] }>()
);
export const loadBrandsFailure = createAction(
  '[Brands] Load Brands Failure',
  props<{ error: any }>()
);
