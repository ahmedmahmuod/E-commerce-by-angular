import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from '../../shared/components/page-title/page-title.component';
import { AddToCartComponent } from '../../shared/components/buttons/add-to-cart/add-to-cart.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule, PageTitleComponent, AddToCartComponent],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent {
  products: any[] = [];
}
