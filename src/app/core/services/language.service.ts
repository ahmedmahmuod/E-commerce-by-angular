import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<string>(this.getLanguageFromLocalStorage());
  public currentLanguage$ = this.currentLanguageSubject.asObservable();
  private platformId = inject(PLATFORM_ID);

  constructor() {
    // Listen for changes in localStorage
    if (isPlatformBrowser(this.platformId)) {
      window.addEventListener('storage', (event) => {
        if (event.key === 'language') {
          const newLanguage = event.newValue || 'en';
          this.currentLanguageSubject.next(newLanguage);
        }
      });
    }
  }

  // Method to get the current language from localStorage
  private getLanguageFromLocalStorage(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('language') || 'en'; 
    }
    return 'en';
  }

  // Method to change the language
  public switchLanguage(lang: string): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('language', lang);
    }
    this.currentLanguageSubject.next(lang);
  }

  // Method to get the current language
  public getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }
}