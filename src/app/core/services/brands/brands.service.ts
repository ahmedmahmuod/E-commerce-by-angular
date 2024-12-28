import { environment } from './../../../../environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BrandsModel } from '../../models/brands/brands.model';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  constructor(private http: HttpClient) { }

  // Get all brands
  getAllBrands(): Observable<BrandsModel[]> {
    return this.http.get<BrandsModel[]>(environment.baseApi + 'brands?limit=100').pipe(map((res: any) => res.data));
  }
}
