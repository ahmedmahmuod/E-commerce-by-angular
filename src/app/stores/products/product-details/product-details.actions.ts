import { createAction, props } from '@ngrx/store';
import { Product } from '../../../core/models/product/product.model';

export const loadProductDetails = createAction(
  '[Products Details] Load Product details',
  props<{productId: string}>()
);
export const loadProductDetailsSuccess = createAction(
  '[Products Details] Load Products details Success',
  props<{ product: Product[] }>()
);
export const loadProductDetailsFailure = createAction(
  '[Products Details] Load Products details Failure',
  props<{ error: any }>()
);
