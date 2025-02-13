import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { TranslateService } from '@ngx-translate/core';
import { Router, RouterOutlet, ActivatedRoute, Event, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, switchMap } from 'rxjs/operators';
import { animate, style, transition, trigger } from '@angular/animations';
import { TokenService } from './core/services/user/services/token.service';
import { UserService } from './core/services/user/services/user.service';
import { AuthService } from './core/services/user/services/auth.service';
import { LanguageService } from './core/services/language.service';
import { HeaderComponent } from "./core/components/header/header.component";
import { FooterComponent } from "./core/components/footer/footer.component";

const fadeAnimation = trigger('fadeAnimation', [
  transition('* <=> *', [
    style({ opacity: 0 }),
    animate('200ms ease-in', style({ opacity: 1 }))
  ])
]);

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [fadeAnimation],
  imports: [HeaderComponent, RouterOutlet, FooterComponent]
})
export class AppComponent {
  private authService = inject(AuthService);
  private tokenService = inject(TokenService);
  private userService = inject(UserService);
  private langService = inject(LanguageService);
  private platformId = inject(PLATFORM_ID);

  lang = signal<string>(this.getSafeLanguage());
  dir: 'ltr' | 'rtl' = 'ltr';

  constructor(
    private translate: TranslateService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleService: Title
  ) {
    translate.setDefaultLang('en');

    this.langService.currentLanguage$.subscribe((lang) => {
      this.dir = lang === 'en' ? 'ltr' : 'rtl';
    });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let route = this.activatedRoute.firstChild;
        while (route?.firstChild) {
          route = route.firstChild;
        }
        return route?.snapshot.data['title'] || 'Market';
      }),
      switchMap(titleKey => this.translate.get(titleKey))
    ).subscribe(title => {
      this.titleService.setTitle(title);
    });
  }

  private getSafeLanguage(): string {
    return isPlatformBrowser(this.platformId) ? localStorage.getItem('language') || 'en' : 'en';
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('language', language);
    }
    this.lang.set(language);
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      if (window.location.pathname === '/allorders') {
        localStorage.setItem('paymentSuccess', 'true');
        window.location.href = `${window.location.origin}/payment-successfualy`;
      }
    }

    this.router.events.subscribe((event: Event) => {
      if (isPlatformBrowser(this.platformId)) {
        if (event instanceof NavigationEnd) {
          window.scrollTo(0, 0);
        }
      }
    });

    const token = this.tokenService.getToken();
    if (token) {
      this.authService.verifyToken().subscribe((res) => {
        this.authService.getUserData(res.decoded.id).subscribe((userData) => {
          this.userService.setUserData(userData);
        });
      });
    }
  }

  getRouteAnimation(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
