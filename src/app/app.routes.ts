import { Routes } from '@angular/router';
import { ProfileComponent } from './features/profile/profile.component';

export const routes: Routes = [
  { path: 'home', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },
  { path: 'about', loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent) },
  { path: 'contact', loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'products', loadComponent: () => import('./features/products/all-products/all-products.component').then(m => m.AllProductsComponent) },
  { path: 'brands', loadComponent: () => import('./features/brands/brands.component').then(m => m.BrandsComponent) },
  { path: 'cart', loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent) },
  { path: 'wishlist', loadComponent: () => import('./features/wishlist/wishlist.component').then(m => m.WishlistComponent) },
  
  
  {
    path: 'user',
    children: [
      { path: 'login', loadComponent: () => import('./features/user/sign-in/sign-in.component').then(m => m.SignInComponent) },
      { path: 'register', loadComponent: () => import('./features/user/sign-up/sign-up.component').then(m => m.SignupComponent) },
      { path: 'forget-password', loadComponent: () => import('./features/user/forget-password/forget-password.component').then(m => m.ForgetPasswordComponent) },
      { 
        path: 'profile', 
        loadComponent: () => import('./features/user/profile/profile.component').then(m => m.ProfileComponent),
        children: [
          { path: 'my-details', loadComponent: () => import('./features/user/profile/my-details/my-details.component').then(m => m.MyDetailsComponent) },
          { path: 'change-password', loadComponent: () => import('./features/user/profile/change-password/change-password.component').then(m => m.ChangePasswordComponent) },
          { path: 'my-orders', loadComponent: () => import('./features/user/profile/orders/orders.component').then(m => m.OrdersComponent) },
          { path: '', redirectTo: 'my-details', pathMatch: 'full' }, 
        ]
      },
      { path: '', redirectTo: '/', pathMatch: 'full' },
    ],
  },
  
  { path: ':categoryOrBrandName/:productId/details', loadComponent: () => import('./features/products/product-details/product-details.component').then(m => m.ProductDetailsComponent) },
  { path: ':type/:id', loadComponent: () => import('./features/products/product-category/products-category.component').then(m => m.ProductsCategoryComponent) },
  
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];