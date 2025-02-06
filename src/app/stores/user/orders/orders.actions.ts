import { createAction, props } from '@ngrx/store';
import { OrderModel } from '../../../core/models/order/order.model';

export const loadOrders = createAction(
  '[Orders] Load Orders',
  props<{ userId: string }>()
);
export const loadOrdersSuccess = createAction(
  '[Orders] Load Orders Success',
  props<{ orders: OrderModel }>()
);
export const loadOrdersFailure = createAction(
  '[Orders] Load Orders Failure',
  props<{ error: any }>()
);
