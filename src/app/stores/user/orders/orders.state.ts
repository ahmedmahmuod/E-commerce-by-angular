import { OrderModel } from '../../../core/models/order/order.model';

export interface OrdersState {
  orders: OrderModel[];
  loading: boolean;
  error: string | null;
}

export const initialState: OrdersState = {
  orders: [],
  loading: false,
  error: null,
};
