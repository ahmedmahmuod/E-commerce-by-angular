import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-hero-section',
    imports: [CommonModule, NzCarouselModule, RouterLink, TranslateModule],
    templateUrl: './hero-section.component.html',
    styleUrls: ['./hero-section.component.css'],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HeroSectionComponent {}
