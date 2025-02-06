import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { TokenService } from '../services/token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardLogin implements CanActivate {
  constructor(private authService: TokenService, private router: Router) {}

  // If the user is not logged in, they can access the route
  canActivate(): boolean {
    const hasToken = this.authService.hasToken();
    
    if (!hasToken) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}