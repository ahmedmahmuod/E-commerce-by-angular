import { createReducer, on } from '@ngrx/store';
import * as OrdersActions from './orders.actions';
import { initialState } from './orders.state';

export const ordersReducer = createReducer(
  initialState,
  on(OrdersActions.loadOrders, (state) => ({ ...state, loading: true })),
  on(OrdersActions.loadOrdersSuccess, (state, { orders }) => ({
    ...state,
    loading: false,
    orders: Array.isArray(orders) ? orders : [orders],
    error: null,
  })),
  on(OrdersActions.loadOrdersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
