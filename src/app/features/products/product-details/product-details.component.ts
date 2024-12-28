import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddToCartComponent } from "../../../shared/buttons/add-to-cart/add-to-cart.component";
import { ImageSliderComponent } from "../../../shared/image-slider/image-slider.component";

interface ProductDetail {
  label: string;
  value: string;
}

interface Product {
  name: string;
  price: number;
  description: string;
  images: string[];
  reviewCount: number;
  details: ProductDetail[];
}

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, ImageSliderComponent, AddToCartComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {
  product: Product = {
    name: 'Pro Max Smartwatch',
    price: 999,
    description: 'Advanced smartwatch with high-resolution display and water resistance. Features activity tracking, heart rate monitoring, and sleep tracking.',
    images: [
      'https://picsum.photos/600/400?random=1',
      'https://picsum.photos/600/400?random=2',
      'https://picsum.photos/600/400?random=3',
      'https://picsum.photos/600/400?random=4'
    ],
    reviewCount: 128,
    details: [
      { label: 'Brand', value: 'TechPro' },
      { label: 'Color', value: 'Black' },
      { label: 'Water Resistance', value: 'Up to 50m' },
      { label: 'Battery Life', value: '5 days' }
    ]
  };
}
