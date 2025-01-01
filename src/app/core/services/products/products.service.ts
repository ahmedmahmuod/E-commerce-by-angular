import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { map, Observable } from 'rxjs';
import { BrandsModel } from '../../models/brands/brands.model';
import { Product } from '../../models/product/product.model';
import { GlobalResponse } from '../../models/global-response/global-response.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  // Get products by brand
  getProductsByBrand(brandId: any): Observable<BrandsModel[]> {
    return this.http.get<BrandsModel[]>(environment.baseApi + 'products?brand=' + brandId);
  }

  // Get products by category
  getProductsByCategory(categoryId: any): Observable<Product[]> {
    return this.http.get<GlobalResponse>(environment.baseApi + 'products?category=' + categoryId)
    .pipe( map((response: GlobalResponse) => response.data));
  }

  // Get Specfic product by id
  getProductById(productId: string): Observable<Product[]> {
    return this.http.get<Product[]>(environment.baseApi + 'products/' + productId).pipe(map((response: any) => response.data));
  }

}
