import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  private router = inject(Router);

  @Input({ required: true }) products!: any;

  // Btn to Add wishlist page
  addToWishlist(product: any): void {
    console.log('Added to wishlist:', product);
  }

  // Btn Add Product to cart
  addToCart(product: any): void {
    console.log('Added to cart:', product);
  }

  viewProduct(product: any) {
    this.router.navigate(['product',product._id,'details']);
  }
}
