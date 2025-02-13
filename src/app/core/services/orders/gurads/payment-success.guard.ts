import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class PaymentGuard implements CanActivate {
  private platformId = inject(PLATFORM_ID);

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (!isPlatformBrowser(this.platformId)) {
      return false;
    }

    const paymentSuccess = localStorage.getItem('paymentSuccess');

    if (paymentSuccess === 'true') {
      return true; 
    } else {
      this.router.navigate(['/']); 
      return false;
    }
  }
}
