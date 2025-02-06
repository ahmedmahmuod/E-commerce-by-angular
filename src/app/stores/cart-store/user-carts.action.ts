import { createAction, props } from '@ngrx/store';
import { CartResponse } from '../../core/models/cart/cart.model';

export const loadUserCarts = createAction('[User Carts] Load User Carts');

export const loadUserCartsSuccess = createAction(
  '[User Carts] Load User Carts Success',
  props<{ carts: CartResponse }>()
);

export const loadUserCartsSuccessFailure = createAction(
  '[User Carts] Load User Carts Failure',
  props<{ error: any }>()
);
