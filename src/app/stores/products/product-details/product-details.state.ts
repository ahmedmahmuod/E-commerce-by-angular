import { Product } from "../../../core/models/product/product.model";

export interface ProductDetailsState {
  product: Product[];
  loading: boolean;
  error: string | null;
}

export const initialState: ProductDetailsState = {
  product: [],
  loading: false,
  error: null,
};
