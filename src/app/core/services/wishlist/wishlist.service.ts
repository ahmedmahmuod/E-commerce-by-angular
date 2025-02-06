import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { WishlistResponse } from '../../models/wishlist/wishtlist.model';
import { environment } from '../../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private http = inject(HttpClient)
  private wishlistCountSubject = new BehaviorSubject<number>(0);

  wishlistCount$ = this.wishlistCountSubject.asObservable();

  // get user wishtlist items
  getUserWishlist(): Observable<WishlistResponse> {
    return this.http.get<WishlistResponse>(`${environment.baseApi}wishlist`);
  }

  // remove wishlist item 
  removeWishlistItem(productId: string): Observable<WishlistResponse> {
     return this.http.delete<WishlistResponse>(`${environment.baseApi}wishlist/${productId}`);
  }

  // add product to user wishlist items
  addWishlistItem(productId: string): Observable<WishlistResponse> {
    return this.http.post<WishlistResponse>(`${environment.baseApi}wishlist`,{ productId }
    )
  }

  // Get count of items in the wishlist
  getWishlistCount(): Observable<number> {
    return this.getUserWishlist().pipe(
      map((wishlist: WishlistResponse) => wishlist.data.length)
    );
  }
}
