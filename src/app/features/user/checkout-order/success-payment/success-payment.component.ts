import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-success-payment',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './success-payment.component.html',
  styleUrl: './success-payment.component.css',
})
export class SuccessPaymentComponent implements OnInit {
  private router = inject(Router)

  ngOnInit(): void {
    localStorage.removeItem('paymentSuccess');
  }

  // go to view all orders
  goViewOrders() {
    this.router.navigate(['/user/profile/my-orders'])
  }
}
