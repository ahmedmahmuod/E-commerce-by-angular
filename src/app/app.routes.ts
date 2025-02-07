import { Routes } from '@angular/router';
import { AuthGuardLogin } from './core/services/user/guards/auth-guard-login';
import { AuthGuardNotLogin } from './core/services/user/guards/auth-guard-notLogin';
import { PaymentGuard } from './core/services/orders/gurads/payment-success.guard';

export const routes: Routes = [
  { path: 'home', data: { title: 'Pages.Home.Title' }, loadComponent: () => import('./features/home/home.component').then(m => m.HomeComponent) },
  { path: 'about', data: { title: 'Pages.About.Title_Page' }, loadComponent: () => import('./features/about/about.component').then(m => m.AboutComponent) },
  { path: 'contact', data: { title: 'Pages.Contact.Title_Page' }, loadComponent: () => import('./features/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'products', data: { title: 'Pages.Products.Title_Page' }, loadComponent: () => import('./features/products/all-products/all-products.component').then(m => m.AllProductsComponent) },
  { path: 'brands', data: { title: 'Pages.Brands.Title_Page' }, loadComponent: () => import('./features/brands/brands.component').then(m => m.BrandsComponent) },
  { path: 'cart', data: { title: 'Pages.Cart.Title_Page' }, loadComponent: () => import('./features/cart/cart.component').then(m => m.CartComponent) },
  { path: 'wishlist', data: { title: 'Pages.Wishlist.Title_Page' }, loadComponent: () => import('./features/wishlist/wishlist.component').then(m => m.WishlistComponent) },
  {path: 'cart/checkout/:cartId',  data: { title: 'Pages.Cart.Checkout.After_Checkout.Title_Page' }, canActivate: [AuthGuardNotLogin], loadComponent: () => import('./features/user/checkout-order/order-checkout.component').then(m => m.OrderCheckoutComponent) },
  { path: 'page-not-found', data: { title: 'Pages.Error_Page.Title_Page' }, loadComponent: () => import('./shared/components/error-page/error-page.component').then(m => m.NotFoundComponent) },
  { path: 'payment-successfualy', data: { title: 'Pages.Cart.Checkout.After_Checkout.Success_Page' }, canActivate: [PaymentGuard], loadComponent: () => import('./features/user/checkout-order/success-payment/success-payment.component').then(m => m.SuccessPaymentComponent) },
  {
    path: 'user',
    children: [
      { path: 'login', data: { title: 'User.Login.Title_Page' }, canActivate: [AuthGuardLogin], loadComponent: () => import('./features/user/sign-in/sign-in.component').then(m => m.SignInComponent) },
      { path: 'register', data: { title: 'User.Sign_Up.Title_Page' }, canActivate: [AuthGuardLogin], loadComponent: () => import('./features/user/sign-up/sign-up.component').then(m => m.SignupComponent) },
      { path: 'forget-password', data: { title: 'User.Forget_Pass.Title_Page' }, canActivate: [AuthGuardLogin], loadComponent: () => import('./features/user/forget-password/forget-password.component').then(m => m.PasswordResetComponent) },
      { 
        path: 'profile',  
        loadComponent: () => import('./features/user/profile/profile.component').then(m => m.ProfileComponent),
        children: [
          { path: 'my-details', data: { title: 'User.Profile.My_Details.Title_Page' }, canActivate: [AuthGuardNotLogin], loadComponent: () => import('./features/user/profile/my-details/my-details.component').then(m => m.MyDetailsComponent) },
          { path: 'change-password', data: { title: 'User.Profile.Change_Password.Title_Page' }, canActivate: [AuthGuardNotLogin], loadComponent: () => import('./features/user/profile/change-password/change-password.component').then(m => m.PasswordChangeComponent) },
          { path: 'my-orders', data: { title: 'User.Profile.Orders.Title_Page' }, canActivate: [AuthGuardNotLogin], loadComponent: () => import('./features/user/profile/orders/orders.component').then(m => m.OrdersComponent) },
          { path: '', redirectTo: 'my-details', pathMatch: 'full' }, 
        ]
      },
      { path: '**', redirectTo: 'page-not-found', pathMatch: 'full' },
    ],
  },
  { path: ':categoryOrBrandName/:productId/details', data: { title: 'Shared.Global.Product_Details_Title_Page' }, loadComponent: () => import('./features/products/product-details/product-details.component').then(m => m.ProductDetailsComponent) },
  { path: ':type/:id', data: { title: 'Pages.Products.Title_Page' }, loadComponent: () => import('./features/products/product-category/products-category.component').then(m => m.ProductsCategoryComponent) },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**',redirectTo: 'page-not-found', pathMatch: 'full' },
];