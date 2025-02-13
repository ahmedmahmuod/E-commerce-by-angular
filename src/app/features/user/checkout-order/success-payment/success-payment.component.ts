import { isPlatformBrowser } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-success-payment',
    imports: [TranslateModule],
    standalone: true,
    templateUrl: './success-payment.component.html',
    styleUrl: './success-payment.component.css'
})
export class SuccessPaymentComponent implements OnInit {
  private router = inject(Router)
  private platformId = inject(PLATFORM_ID);

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('paymentSuccess');
    }
  }

  // go to view all orders
  goViewOrders() {
    this.router.navigate(['/user/profile/my-orders'])
  }
}
