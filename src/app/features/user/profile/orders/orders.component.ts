import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { UserService } from '../../../../core/services/user/services/user.service';
import { Store } from '@ngrx/store';
import * as OrdersActions from '../../../../stores/user/orders/orders.actions';
import { selectOrders } from '../../../../stores/user/orders/orders.selectors';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { SpinnerComponent } from "../../../../shared/components/spinner/spinner.component";
import { DialogService, DynamicDialogModule, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ProductListDemo } from './products-dialog/productlistdemo';
import { ProductDialogService } from './products-dialog/products-dialog.service';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, RouterModule, ButtonModule, ToastModule, SpinnerComponent, DynamicDialogModule, TranslateModule],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
  providers: [MessageService, DialogService,DynamicDialogRef]
  
})
export class OrdersComponent implements OnInit, OnDestroy {
  private messageService = inject(MessageService)
  private dialogService = inject(DialogService)
  private productDialogService = inject(ProductDialogService)
  private langService = inject(LanguageService);

  ref: DynamicDialogRef | undefined;
  orders$!: Observable<any>;
  loading$!: Observable<boolean>; 
  currentLang$!: Observable<string>;
  
  constructor(
    private userService: UserService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.langService.currentLanguage$.subscribe((lang) => {
      this.currentLang$ = of(lang)  
    })
    
    this.loading$ = of(true)
    this.orders$ = this.store.select(selectOrders)
    this.userService.userData$.subscribe((data) => {
      if (data) {
        const userId = data.data._id;
        this.store.dispatch(OrdersActions.loadOrders({ userId: userId }));
        this.loading$ = of(false)
      }
    });

    const orderSuccessMessage = sessionStorage.getItem('orderSuccessMessage');
    if (orderSuccessMessage) {
      let lang: string = 'en'; 
      this.currentLang$.subscribe((value) => lang = value); 

      timer(500).subscribe(() => { 
        if (lang === 'en') {
          this.messageService.add({ severity: 'success', summary: 'Order Created', detail: 'Order created sucesfully' });
        } else {
          this.messageService.add({ severity: 'success', summary: 'تم بنجاح', detail: 'تم انشاء الطلب الخاص بك بنجاح' });
        }        
        sessionStorage.removeItem('orderSuccessMessage');
      });
    }
  }

  // on viewOrderProducts
  viewOrderProducts(order: any) {    
    this.langService.currentLanguage$.subscribe((lang) => {
      this.currentLang$ = of(lang)       
    })

    this.productDialogService.setProducts(order.cartItems);
    this.currentLang$.subscribe((lang) => {
      this.ref = this.dialogService.open(ProductListDemo, {
        header: lang === 'en' ? 'Order Details' : 'تفاصيل الطلب',
        width: '70vw',
        modal: true,
        dismissableMask: true,
        closeOnEscape: true,
        contentStyle: { 
          'padding': '0',
          'border-radius': '0px',
          'overflow': 'hidden'
        },
        style: {
          'box-shadow': '0 4px 12px rgba(0,0,0,0.1)'
        },
      });
    });
  }

  ngOnDestroy() { 
    if (this.ref) {
        this.ref.close();
    }
  }
}
