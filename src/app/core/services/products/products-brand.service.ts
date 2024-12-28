import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { BrandsModel } from '../../models/brands/brands.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsBrandService {

  constructor(private http: HttpClient) { }

  // Get products by brand
  getProductsByBrand(brandId: any): Observable<BrandsModel[]> {
    return this.http.get<BrandsModel[]>(environment.baseApi + 'products?brand=' + brandId);
  }

  // Get products counts of brand
  // getProductsCountOfBrand(brandId: number): Observable<BrandsModel[]> {
  //   return this.http.get<BrandsModel[]>(environment.baseApi + 'products?brand=' + brandId);
  // }
}
