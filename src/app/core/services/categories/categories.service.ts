import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BrandsModel } from '../../models/brands/brands.model';
import { environment } from '../../../../environments/environment.prod';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  // Get All Categories
  getCategories(): Observable<BrandsModel[]> {
    return this.http
      .get<BrandsModel[]>(environment.baseApi + 'categories')
      .pipe(map((res: any) => res.data));
  }

  // Get Single Category by id
  getCategoryById(categoryId: number): Observable<BrandsModel[]> {
    return this.http.get<BrandsModel[]>(environment.baseApi + 'categories/' + categoryId)
  }
}
