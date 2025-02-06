import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductDialogService {
  private products: any[] = [];

  setProducts(products: any[]) {
    this.products = products;
  }

  getProducts() {
    return this.products;
  }
}
