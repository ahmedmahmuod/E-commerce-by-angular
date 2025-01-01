import { BrandsModel } from '../../core/models/brands/brands.model';

export interface CategoriesState {
  categories: BrandsModel[];
  loading: boolean;
  error: string | null;
}

export const initialState: CategoriesState = {
  categories: [],
  loading: false,
  error: null,
};
