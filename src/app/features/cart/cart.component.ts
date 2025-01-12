import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ViewProductComponent } from './../../shared/components/buttons/view-product/view-product.component';
import { PageTitleComponent } from "../../shared/components/page-title/page-title.component";

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  ref: string;
  deliveryOptions: {
    clickAndCollect: boolean;
    homeDelivery: boolean;
  };
}

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule, ViewProductComponent, PageTitleComponent],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {
  cartItems: CartItem[] = [
    {
      id: '1',
      name: 'LEGO 71043 Harry Potter Hogwarts Castle Toy for Teens & Adults',
      image: 'https://example.com/hogwarts.jpg',
      price: 314.99,
      quantity: 1,
      ref: '169928',
      deliveryOptions: {
        clickAndCollect: true,
        homeDelivery: true
      }
    },
    {
      id: '2',
      name: 'Pokémon Charizard 30cm Plush',
      image: 'https://example.com/charizard.jpg',
      price: 19.99,
      quantity: 1,
      ref: '174619',
      deliveryOptions: {
        clickAndCollect: true,
        homeDelivery: true
      }
    }
  ];

  get subtotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  get delivery(): number {
    return 0.00;
  }

  get total(): number {
    return this.subtotal + this.delivery;
  }

  increaseQuantity(item: CartItem): void {
    item.quantity++;
  }

  decreaseQuantity(item: CartItem): void {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }

  removeItem(item: CartItem): void {
    this.cartItems = this.cartItems.filter(i => i.id !== item.id);
  }
}