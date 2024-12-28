import { BrandsModel } from '../../core/models/brands/brands.model';

export interface BrandsState {
  brands: BrandsModel[];
  loading: boolean;
  error: string | null;
}

export const initialState: BrandsState = {
  brands: [],
  loading: false,
  error: null,
};
