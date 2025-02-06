import { Routes } from '@angular/router';
import { AuthGuardLogin } from './core/services/user/guards/auth-guard-login';
import { AuthGuardNotLogin } from './core/services/user/guards/auth-guard-notLogin';
import { PaymentGuard } from './core/services/orders/gurads/payment-success.guard';

export const routes: Routes = [
  { path: 'home', loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },
  { path: 'about', loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent) },
  { path: 'contact', loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'products', loadComponent: () => import('./features/products/all-products/all-products.component').then(m => m.AllProductsComponent) },
  { path: 'brands', loadComponent: () => import('./features/brands/brands.component').then(m => m.BrandsComponent) },
  { path: 'cart', loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent) },
  { path: 'wishlist', loadComponent: () => import('./features/wishlist/wishlist.component').then(m => m.WishlistComponent) },
  {path: 'cart/checkout/:cartId', canActivate: [AuthGuardNotLogin], loadComponent: () => import('./features/user/checkout-order/order-checkout.component').then(m => m.OrderCheckoutComponent) },
  { path: 'page-not-found', loadComponent: () => import('./shared/components/error-page/error-page.component').then(m => m.NotFoundComponent) },
  { path: 'payment-successfualy', canActivate: [PaymentGuard], loadComponent: () => import('./features/user/checkout-order/success-payment/success-payment.component').then(m => m.SuccessPaymentComponent) },
  {
    path: 'user',
    children: [
      { path: 'login', canActivate: [AuthGuardLogin], loadComponent: () => import('./features/user/sign-in/sign-in.component').then(m => m.SignInComponent) },
      { path: 'register', canActivate: [AuthGuardLogin], loadComponent: () => import('./features/user/sign-up/sign-up.component').then(m => m.SignupComponent) },
      { path: 'forget-password', canActivate: [AuthGuardLogin], loadComponent: () => import('./features/user/forget-password/forget-password.component').then(m => m.PasswordResetComponent) },
      { 
        path: 'profile', 
        loadComponent: () => import('./features/user/profile/profile.component').then(m => m.ProfileComponent),
        children: [
          { path: 'my-details', canActivate: [AuthGuardNotLogin], loadComponent: () => import('./features/user/profile/my-details/my-details.component').then(m => m.MyDetailsComponent) },
          { path: 'change-password',canActivate: [AuthGuardNotLogin], loadComponent: () => import('./features/user/profile/change-password/change-password.component').then(m => m.PasswordChangeComponent) },
          { path: 'my-orders',canActivate: [AuthGuardNotLogin], loadComponent: () => import('./features/user/profile/orders/orders.component').then(m => m.OrdersComponent) },
          { path: '', redirectTo: 'my-details', pathMatch: 'full' }, 
        ]
      },
      { path: '**', redirectTo: 'page-not-found', pathMatch: 'full' },
    ],
  },
  
  { path: ':categoryOrBrandName/:productId/details', loadComponent: () => import('./features/products/product-details/product-details.component').then(m => m.ProductDetailsComponent) },
  { path: ':type/:id', loadComponent: () => import('./features/products/product-category/products-category.component').then(m => m.ProductsCategoryComponent) },
  
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**',redirectTo: 'page-not-found', pathMatch: 'full' },

];