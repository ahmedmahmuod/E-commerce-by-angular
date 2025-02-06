import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLanguageSubject = new BehaviorSubject<string>(this.getLanguageFromLocalStorage());
  public currentLanguage$ = this.currentLanguageSubject.asObservable();

  constructor() {
    // Listen for changes in localStorage
    window.addEventListener('storage', (event) => {
      if (event.key === 'language') {
        const newLanguage = event.newValue || 'en';
        this.currentLanguageSubject.next(newLanguage);
      }
    });
  }

  // Method to get the current language from localStorage
  private getLanguageFromLocalStorage(): string {
    return localStorage.getItem('language') || 'en'; 
  }

  // Method to change the language
  public switchLanguage(lang: string): void {
    localStorage.setItem('language', lang);
    this.currentLanguageSubject.next(lang);
  }

  // Method to get the current language
  public getCurrentLanguage(): string {
    return this.currentLanguageSubject.value;
  }
}