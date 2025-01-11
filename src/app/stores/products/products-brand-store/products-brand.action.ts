import { createAction, props } from '@ngrx/store';
import { Product } from '../../../core/models/product/product.model';
import { BrandsModel } from '../../../core/models/brands/brands.model';

export const loadProductsBrand = createAction(
  '[Products-Brand] Load Products Brand',
  props<{brandId: string}>()
);
export const loadProductsBrandSuccess = createAction(
  '[Products-Brand] Load Products Brand Success',
  props<{ products: BrandsModel[] }>()
);
export const loadProductsBrandFailure = createAction(
  '[Products-Brand] Load Products Brand Failure',
  props<{ error: any }>()
);
