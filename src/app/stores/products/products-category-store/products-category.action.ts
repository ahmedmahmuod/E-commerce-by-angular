import { createAction, props } from '@ngrx/store';
import { Product } from '../../../core/models/product/product.model';

export const loadProductsCategory = createAction(
  '[Products-Category] Load Products Category',
  props<{categoryId: string}>()
);
export const loadProductsCategorySuccess = createAction(
  '[Products-Category] Load Products Category Success',
  props<{ products: Product[] }>()
);
export const loadProductsCategoryFailure = createAction(
  '[Products-Category] Load Products Category Failure',
  props<{ error: any }>()
);
