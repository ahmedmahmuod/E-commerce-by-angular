import { Component, inject, Input, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ProductDialogService } from './products-dialog.service';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
    providers: [DialogService],
    imports: [TableModule, ButtonModule, TranslateModule, CommonModule],
    template: `
    <div class="product-dialog">
      <p-table [value]="products" [tableStyle]="{ 'min-width': '50rem' }" header="Order Details">
        <ng-template pTemplate="header">
          <tr>
            <th>{{'User.Profile.Orders.Order_Details.Table_Details.Product_Name' | translate}}</th>
            <th>{{'User.Profile.Orders.Order_Details.Table_Details.Image' | translate}}</th>
            <th>{{'User.Profile.Orders.Order_Details.Table_Details.Price' | translate}}</th>
            <th>{{'User.Profile.Orders.Order_Details.Table_Details.Quantity' | translate}}</th>
          </tr>
        </ng-template>
        <ng-template pTemplate="body" let-product>
          <tr class="product-tr" (click)="viewProduct(product)">
            <td>
              <span class="font-bold">{{ product.product.title }}</span>
            </td>
            <td>
              <img  [src]="product.product.imageCover" [alt]="product.name" class="product-image"/>
            </td>
            <td class="font-bold">{{ product.price | currency: ('User.Profile.Orders.Order_Details.Table_Details.Unit_Price' | translate) }}</td>
            <td>
              <span [class]=" 'quantity-badge ' + (product.count > 0 ? 'in-stock' : 'out-of-stock')">
                {{ product.count }}
              </span>
            </td>
          </tr>
        </ng-template>
      </p-table>
    </div>
  `,
    styles: [
        `
      .product-dialog {
        padding: 1rem;
        border-radius: 0px !important;
        max-height: 70vh;
        overflow-y: auto; 
      }

      .p-dialog-content {
        border-radius: 0px !important;
        max-height: 70vh;
        overflow-y: auto;
      }

      .p-table {
        width: 100%;
        table-layout: fixed; 
        max-height: calc(70vh - 100px); 
        overflow-y: auto;
      }

      .product-image {
        width: 50px;
        height: 50px;
        border-radius: 8px;
        object-fit: cover;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }

      .quantity-badge {
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-weight: bold;
      }

      .in-stock {
        background-color: #c6f6d5;
        color: #22543d;
      }

      .out-of-stock {
        background-color: #fed7d7;
        color: #742a2a;
      }

      :host ::ng-deep .p-datatable .p-datatable-header {
        background: #f8f9fa;
        border: 1px solid #dee2e6;
        padding: 1rem;
      }

      :host ::ng-deep .p-datatable .p-datatable-thead > tr > th {
        background: #f8f9fa;
        padding: 1rem;
        text-align: left;
        border: 1px solid #dee2e6;
      }

      :host ::ng-deep .p-datatable .p-datatable-tbody > tr > td {
        padding: 1rem;
        border: 1px solid #dee2e6;
      }

      .product-tr {
        cursor: pointer;
        transition: 0.3s ease-in;
        color: var(--font-secondary);
      }
      
      .product-tr:hover {
        background-color: #dddddd;
      }
    `,
    ]
})
export class ProductListDemo implements OnInit {
  private productDialogService = inject(ProductDialogService)
  private router = inject(Router);

  @Input() products: any[] = [];

  ngOnInit() {
    this.products = this.productDialogService.getProducts();    
  }

  viewProduct(product: any) {
    const productId = product.product.id;
    this.router.navigate(['order',productId,'details']);
  }
}
