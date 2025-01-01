import { Product } from '../product/product.model';

export interface GlobalResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
  };
  data: Product[];
}
