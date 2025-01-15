import { Component } from '@angular/core';
import { HeaderComponent } from './core/components/header/header.component';
import { Event, NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { FooterComponent } from './core/components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  } 
}
