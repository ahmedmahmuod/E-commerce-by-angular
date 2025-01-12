import { Component, signal, HostListener } from '@angular/core';
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
  isMenuOpen: boolean = false;
  isHeaderVisible = true;
  isLogged = signal<boolean>(false);

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const menu = document.querySelector('.mobile-menu') as HTMLElement;
    const menuIcon = document.querySelector('.menu-icon') as HTMLElement;

    if (this.isMenuOpen && menu && menuIcon && !menu.contains(target) && !menuIcon.contains(target)) {
      this.isMenuOpen = false;
    }
  }
}