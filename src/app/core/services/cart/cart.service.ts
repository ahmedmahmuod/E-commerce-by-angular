import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { CartResponse } from '../../models/cart/cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private http = inject(HttpClient);
  private cartCountSubject = new BehaviorSubject<number>(0);

  cartCount$ = this.cartCountSubject.asObservable();

  // Get user cart items
  getUserCart(): Observable<CartResponse> {
    return this.http.get<CartResponse>(`${environment.baseApi}cart`);
  }
  
  // add product to user cart
  addProductToCart(productId: string): Observable<CartResponse> {
    return this.http.post<CartResponse>(environment.baseApi + 'cart', { productId });
  }
  
  // update product quantity in user cart 
  updateProductQuantity(productId: string, count: string): Observable<CartResponse> {
    return this.http.put<CartResponse>(environment.baseApi + `cart/${productId}`, { count });
  }

  // remove product from user cart
  deleteProductFromCart(productId: string): Observable<CartResponse> {
   return this.http.delete<CartResponse>(environment.baseApi + `cart/${productId}`)
  }
  
  // Clear user cart
  clearAllCartUser (): Observable<CartResponse> {
    return this.http.delete<CartResponse>(environment.baseApi + 'cart');
  }

  // Get count of items in the cart
  getCartCount(): Observable<number> {
    return this.getUserCart().pipe(
      map((cart: CartResponse) => cart.data.products.length)
    );
  }
}