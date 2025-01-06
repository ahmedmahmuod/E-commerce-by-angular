import { Product } from '../../../core/models/product/product.model';

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export const initialState: ProductsState = {
  products: [],
  loading: false,
  error: null,
};
