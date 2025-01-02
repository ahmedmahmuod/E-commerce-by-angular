import { ProductsService } from './../../../core/services/products/products.service';
import { Component, inject, signal } from '@angular/core';
import { Product } from '../../../core/models/product/product.model';
import { CommonModule } from '@angular/common';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { ProductCardComponent } from '../../../shared/components/product-card/product-card.component';
import { HomeHeaderPageComponent } from "../../../shared/components/home-header/home-header-page.component";

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [
    CommonModule,
    NzPageHeaderModule,
    ProductCardComponent,
    HomeHeaderPageComponent
],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.css',
})
export class AllProductsComponent {
  products = signal<Product[]>([]);

  private productsService = inject(ProductsService);

  constructor() {
    this.productsService.getAllProducts().subscribe((products) => {
      this.products.set(products);
      console.log(products);
      
    });
  }
}
