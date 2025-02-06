import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, timer } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private router = inject(Router);
  private tokenKey = 'authToken';

  private tokenSubject = new BehaviorSubject<string | null>(this.getToken());
  token$ = this.tokenSubject.asObservable();

  private isAuthenticated = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.isAuthenticated.asObservable();

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
    this.tokenSubject.next(token); 
    this.isAuthenticated.next(true); 
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
    this.tokenSubject.next(null); 
    this.isAuthenticated.next(false);
    timer(400).subscribe(() => {
      this.router.navigate(['/home'])
    });
  }

  hasToken(): boolean {
    return !!this.getToken();
  }
}
