import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, timer } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);
  private tokenKey = 'authToken';

  private tokenSubject = new BehaviorSubject<string | null>(this.getSafeToken());
  token$ = this.tokenSubject.asObservable();

  private isAuthenticated = new BehaviorSubject<boolean>(this.hasSafeToken());
  isLoggedIn$ = this.isAuthenticated.asObservable();

  private getSafeToken(): string | null {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem(this.tokenKey) : null;
  }

  private hasSafeToken(): boolean {
    return isPlatformBrowser(this.platformId) ? !!this.getSafeToken() : false;
  }

  setToken(token: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(this.tokenKey, token);
      this.tokenSubject.next(token);
      this.isAuthenticated.next(true);
    }
  }

  getToken(): string | null {
    return this.getSafeToken();
  }

  removeToken(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(this.tokenKey);
      this.tokenSubject.next(null);
      this.isAuthenticated.next(false);
      timer(400).subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }

  hasToken(): boolean {
    return this.hasSafeToken();
  }
}
