import { CartResponse } from '../../core/models/cart/cart.model';

export interface CartsState {
  carts: CartResponse[];
  loading: boolean;
  error: string | null;
}

export const initialState: CartsState = {
  carts: [],
  loading: false,
  error: null,
};
