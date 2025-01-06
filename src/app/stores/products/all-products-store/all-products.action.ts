import { createAction, props } from '@ngrx/store';
import { Product } from '../../../core/models/product/product.model';

export const loadAllProducts = createAction('[All Products] Load All Products');

export const loadAllProductsSuccess = createAction(
  '[All Products] Load All Products Success',
  props<{ products: Product[] }>()
);

export const loadAllProductsFailure = createAction(
  '[All Products] Load All Products Failure',
  props<{ error: any }>()
);
