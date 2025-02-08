import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { OrdersService } from '../../../core/services/orders/orders.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { SpinnerComponent } from "../../../shared/components/spinner/spinner.component";
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../core/services/language.service';

@Component({
    selector: 'app-checkout',
    templateUrl: './order-checkout.component.html',
    styleUrls: ['./order-checkout.component.css'],
    imports: [ReactiveFormsModule, CommonModule, SpinnerComponent, ButtonModule, ToastModule, TranslateModule],
    providers: [MessageService]
})
export class OrderCheckoutComponent {
  private orderService = inject(OrdersService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private langService = inject(LanguageService);

  cartId!: string;
  checkoutForm: FormGroup;
  loading$!: Observable<boolean>; 
  currentLang$!: Observable<string>;


  constructor(private fb: FormBuilder) {
    this.checkoutForm = this.fb.group({
      details: ['', [Validators.required, Validators.minLength(3)]],
      phone: ['', [Validators.required, Validators.pattern('^01[0-9]{9}$')]],
      city: ['', Validators.required]
    });

    this.langService.currentLanguage$.subscribe((lang) => {
      this.currentLang$ = of(lang)  
    })
  }

  // is invalid if form is invalid and form is submitted
  isFieldInvalid(fieldName: string): boolean {
    const field = this.checkoutForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }

  // process payment cash and pay by visa
  processPayment(method: 'visa' | 'cash') {
      if (this.checkoutForm.valid) {
        this.route.params.subscribe(params => {
          this.cartId = params['cartId'];
        });
    
        const shippingAddress = {
          details: this.checkoutForm.value.details,
          phone: this.checkoutForm.value.phone,
          city: this.checkoutForm.value.city
        }
    
        this.loading$ = of(true);
        this.orderService.createCashOrder(this.cartId, shippingAddress, method).subscribe(response => {
          this.loading$ = of(false);
          
          if (method === 'visa') {
            if (response && (response as any).session?.url) {
              window.location.href = (response as any).session.url;
            }
          } else {
            this.router.navigate(['/user/profile/my-orders']);
          }
        });
      }
    }
  }
  
