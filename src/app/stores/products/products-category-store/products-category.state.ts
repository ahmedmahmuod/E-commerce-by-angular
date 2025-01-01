import { Product } from "../../../core/models/product/product.model";

export interface ProductsCategoryState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

export const initialState: ProductsCategoryState = {
  products: [],
  loading: false,
  error: null,
};
