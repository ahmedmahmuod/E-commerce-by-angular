import { Component } from '@angular/core';
import { ViewProductComponent } from './../../shared/components/buttons/view-product/view-product.component';
import { AddToCartComponent } from './../../shared/components/buttons/add-to-cart/add-to-cart.component';
import { PageTitleComponent } from '../../shared/components/page-title/page-title.component';
import { CommonModule } from '@angular/common';

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  stockStatus: string;
  imageUrl: string;
  addedOn: string;
}
@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent {
  products: Product[] = [
    {
      id: 1,
      name: 'Beanie with Logo',
      price: 18.0,
      originalPrice: 20.0,
      stockStatus: 'In Stock',
      imageUrl: '../../../assets/images/laptop.webp',
      addedOn: 'December 5, 2019',
    },
    {
      id: 2,
      name: 'Classy shirt',
      price: 16.0,
      stockStatus: 'In Stock',
      imageUrl: '../../../assets/images/product1.webp',
      addedOn: 'December 6, 2019',
    },
    {
      id: 3,
      name: 'Beanie',
      price: 18.0,
      originalPrice: 20.0,
      stockStatus: 'In Stock',
      imageUrl: '../../../assets/images/product2.webp',
      addedOn: 'December 6, 2019',
    },
  ];
}
