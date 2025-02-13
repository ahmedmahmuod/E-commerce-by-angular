import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-image-slider',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './image-slider.component.html',
    styleUrl: './image-slider.component.css'
})
export class ImageSliderComponent {
  @Input() images: string[] = [];
  selectedIndex = 0;

  selectImage(index: number): void {
    this.selectedIndex = index;
  }
}