import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PaymentGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const paymentSuccess = localStorage.getItem('paymentSuccess');

    if (paymentSuccess === 'true') {
      return true; 
    } else {
      this.router.navigate(['/']); 
      return false;
    }
  }
}
