import { Component } from '@angular/core';
import { ViewProductComponent } from './../../shared/components/buttons/view-product/view-product.component';
import { AddToCartComponent } from './../../shared/components/buttons/add-to-cart/add-to-cart.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [AddToCartComponent, ViewProductComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {

}
