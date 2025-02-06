import { Component, inject, signal } from '@angular/core';
import { HeaderComponent } from './core/components/header/header.component';
import { Event, NavigationEnd, Router, RouterOutlet, ActivatedRoute } from '@angular/router';
import { FooterComponent } from './core/components/footer/footer.component';
import { TokenService } from './core/services/user/services/token.service';
import { UserService } from './core/services/user/services/user.service';
import { AuthService } from './core/services/user/services/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './core/services/language.service';
import { filter, map, switchMap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  private authService = inject(AuthService);
  private tokenServie = inject(TokenService);
  private userService = inject(UserService);
  private langService = inject(LanguageService);

  lang = signal<string>(localStorage.getItem('language') || 'en');
  dir: 'ltr' | 'rtl' = 'ltr';

  constructor(private translate: TranslateService, private router: Router, private activatedRoute: ActivatedRoute, private titleService: Title,) {
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

      )
      .subscribe(title => {
        this.titleService.setTitle(title);
      });
  }

  switchLanguage(language: string) {
    this.translate.use(language);
    localStorage.setItem('language', language);
    this.lang.set(language);
  }

  ngOnInit() {
    if (window.location.pathname === '/allorders') {
      localStorage.setItem('paymentSuccess', 'true');
      window.location.href = `${window.location.origin}/payment-successfualy`;
    }

    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });

    const token = this.tokenServie.getToken();

    if (token) {
      this.authService.verifyToken().subscribe((res) => {
        this.authService.getUserData(res.decoded.id).subscribe((userData) => {
          this.userService.setUserData(userData);
        });
      });
    }
  }
}
