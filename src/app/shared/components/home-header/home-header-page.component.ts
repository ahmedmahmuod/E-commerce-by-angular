import { Component, Input } from '@angular/core';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-header-page',
  standalone: true,
  imports: [NzPageHeaderModule, RouterLink, CommonModule],
  templateUrl: './home-header-page.component.html',
  styleUrl: './home-header-page.component.css',
})
export class HomeHeaderPageComponent {
  @Input() title!: string;
  @Input() type?: string;
}
