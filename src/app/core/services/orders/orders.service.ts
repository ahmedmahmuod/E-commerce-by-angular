import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderModel } from '../../models/order/order.model';
import { environment } from '../../../../environments/environment.prod';
import { CheckoutRequest } from '../../models/checkout/checkout.model';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private http = inject(HttpClient);
  private platformId = inject(PLATFORM_ID);

  // get user orders by user id
  getOrdersUser (userId: string): Observable<OrderModel> {
    return this.http.get<OrderModel>(environment.baseApi + `orders/user/${userId}`)
  }

  // Create cash order 
  createCashOrder(cartId: string, shippingAddress: CheckoutRequest, type: 'visa' | 'cash'): Observable<OrderModel> {
    if (isPlatformBrowser(this.platformId)) {
      const baseUrl = window.location.origin;
      if (type === 'cash') {
        return this.http.post<OrderModel>(environment.baseApi + `orders/${cartId}`, { shippingAddress });
        
      } else {
        return this.http.post<OrderModel>(
          `${environment.baseApi}orders/checkout-session/${cartId}?url=${encodeURIComponent(baseUrl)}`,
          { shippingAddress }
        );
      }
    } else {
      return new Observable<OrderModel>();
    }
  }
}