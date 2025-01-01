import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BrandsModel } from '../../models/brands/brands.model';
import { environment } from '../../../../environments/environment.prod';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubCategoriesService {
  constructor(private http: HttpClient) {}

  // Get all SubCategories
  getAllSubCategories(): Observable<BrandsModel[]> {
    return this.http
      .get<BrandsModel[]>(environment.baseApi + 'subcategories')
      .pipe(map((res: any) => res.data));
  }

  // Get all SubCategories on Category
  getSubCategoriesOnCategory(categoryId: string): Observable<BrandsModel[]> {
    return this.http
      .get<BrandsModel[]>(
        environment.baseApi + 'categories' + `/${categoryId}/` + 'subcategories'
      )
      .pipe(map((res: any) => res.data));
  }
}
