import { ProductsService } from './../../../core/services/products/products.service';
import { ImageSliderComponent } from './../../../shared/components/image-slider/image-slider.component';
import { AddToCartComponent } from './../../../shared/components/buttons/add-to-cart/add-to-cart.component';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../../core/models/product/product.model';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, ImageSliderComponent, AddToCartComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent {
  private productsService = inject(ProductsService);
  private route = inject(ActivatedRoute);

  product: any = [];

  constructor() {
    this.route.paramMap.subscribe((params) => {
      const productId = params.get('productId');

      this.productsService.getProductById(productId!).subscribe((res) => {
        console.log(res);
        this.product = res;
        console.log(this.product);
      });
    });
  }

  getFullStars(): number[] {
    const fullStars = Math.floor(this.product.ratingsAverage);
    return Array(fullStars).fill(0);
  }

  hasHalfStar(): boolean {
    const fraction =
      this.product.ratingsAverage - Math.floor(this.product.ratingsAverage);
    return fraction >= 0.5;
  }

  getEmptyStars(): number[] {
    const fullStars = Math.floor(this.product.ratingsAverage);
    const totalStars = 5;
    const emptyStars = totalStars - fullStars - (this.hasHalfStar() ? 1 : 0);
    return Array(emptyStars).fill(0);
  }
}
