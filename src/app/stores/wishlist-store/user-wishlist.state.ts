import { WishlistResponse } from '../../core/models/wishlist/wishtlist.model';

export interface WishlistState {
  wishlist: WishlistResponse[];
  loading: boolean;
  error: string | null;
}

export const initialState: WishlistState = {
  wishlist: [],
  loading: false,
  error: null,
};
