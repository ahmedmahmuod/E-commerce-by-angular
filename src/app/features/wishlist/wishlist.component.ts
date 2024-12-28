import { Component } from '@angular/core';
import { AddToCartComponent } from "../../shared/buttons/add-to-cart/add-to-cart.component";
import { ViewProductComponent } from "../../shared/buttons/view-product/view-product.component";

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [AddToCartComponent, ViewProductComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css'
})
export class WishlistComponent {

}
