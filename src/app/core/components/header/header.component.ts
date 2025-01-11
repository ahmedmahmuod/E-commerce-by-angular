import { Component, HostListener, signal } from '@angular/core';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { FormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { CommonModule } from '@angular/common';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';

NzIconModule;
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    FormsModule,
    NzIconModule,
    NzRateModule,
    NzSelectModule,
    NzIconModule,
    NzToolTipModule,
    CommonModule,
    RouterLink,
    NzDropDownModule,
    NzIconModule,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  animations: [
    trigger('headerAnimation', [
      state(
        'void',
        style({
          transform: 'translateY(-100%)',
          opacity: 0,
        })
      ),
      state(
        '*',
        style({
          transform: 'translateY(0)',
          opacity: 1,
        })
      ),
      transition('void => *', [animate('300ms ease-out')]),
      transition('* => void', [animate('300ms ease-in')]),
    ]),
    trigger('slideAnimation', [
      state(
        'void',
        style({
          transform: 'translateX(-100%)',
          opacity: 0,
        })
      ),
      state(
        '*',
        style({
          transform: 'translateX(0)',
          opacity: 1,
        })
      ),
      transition('void => *', [animate('300ms ease-out')]),
      transition('* => void', [animate('300ms ease-in')]),
    ]),
  ],
})
export class HeaderComponent {
  selectedLanguage = signal<string>('en');
  tooltipColor: string = getComputedStyle(document.documentElement)
    .getPropertyValue('--tooltip-color')
    .trim();
  isMenuOpen: boolean = false;
  isHeaderVisible = true;
  lastScrollTop = 50;

  isLogged = signal<boolean>(false);

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const currentScrollTop =
      window.scrollY || document.documentElement.scrollTop;
    if (currentScrollTop > this.lastScrollTop) {
      this.isHeaderVisible = false;
    } else if (currentScrollTop < this.lastScrollTop) {
      this.isHeaderVisible = true;
    }
    this.lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
  }
}
