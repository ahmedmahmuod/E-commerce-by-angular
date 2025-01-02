import { CommonModule } from '@angular/common';
import { Component, inject, Input, input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ProductsService } from '../../../core/services/products/products.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrl: './product-card.component.css',
})
export class ProductCardComponent {
  private route = inject(ActivatedRoute);
  categoryId!: string;
  @Input({ required: true }) products!: any;

  // Btn to Add wishlist page
  addToWishlist(product: any): void {
    console.log('Added to wishlist:', product);
  }

  // Btn Add Product to cart
  addToCart(product: any): void {
    console.log('Added to cart:', product);
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.categoryId = params['categoryId'];
    });
  }
}
