import { BrandsModel } from "../../../core/models/brands/brands.model";
import { Product } from "../../../core/models/product/product.model";

export interface ProductsBrandState {
  products: BrandsModel[];
  loading: boolean;
  error: string | null;
}

export const initialState: ProductsBrandState = {
  products: [],
  loading: false,
  error: null,
};
