import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },
    { path: 'about', loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent) },
    { path: 'contact', loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent) },
    { path: 'products', loadComponent: () => import('./features/products/all-products/all-products.component').then(m => m.AllProductsComponent) },
    { path: 'brands', loadComponent: () => import('./features/brands/brands.component').then(m => m.BrandsComponent) },
    { path: 'cart', loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent) },
    { path: 'wishlist', loadComponent: () => import('./features/wishlist/wishlist.component').then(m => m.WishlistComponent) },
    { path: 'login', loadComponent: () => import('./features/user/sign-in/sign-in.component').then(m => m.SignInComponent) },
    { path: 'register', loadComponent: () => import('./features/user/sign-up/sign-up.component').then(m => m.SignUpComponent) },
    { path: 'forget-password', loadComponent: () => import('./features/user/forget-password/forget-password.component').then(m => m.ForgetPasswordComponent) },
];
