// product.interface.ts
export interface Product {
  _id: string;
  title: string;
  imageCover: string;
  category: Category;
  brand: Brand;
  subcategory: Subcategory[];
  ratingsQuantity: number;
  ratingsAverage: number;
}

// category.interface.ts
export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// brand.interface.ts
export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

// subcategory.interface.ts
export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

// cart-item.interface.ts
export interface CartItem {
  _id: string;
  count: number;
  product: Product;
  price: number;
}

// user.interface.ts
export interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
}

// shipping-address.interface.ts
export interface ShippingAddress {
  details: string;
  phone: string;
  city: string;
}

// order.interface.ts
export interface OrderModel {
  _id: string;
  user: User;
  cartItems: CartItem[];
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: string;
  isPaid: boolean;
  isDelivered: boolean;
  createdAt: string;
  updatedAt: string;
  id: number;
  __v: number;
}