import { Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-global-btn',
  standalone: true,
  imports: [ButtonModule],
  template: ` <div class="flex justify-center">
    <p-button class="view-all" [label]="title" icon="pi" />
  </div>`,
  styles: [
    `
      .view-all {
        padding: 7px 13px;
        text-align: center;
        background-color: var(--font-main);
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        color: var(--bg-main);
        display: flex;
        justify-content: center;
        align-items: center;
        width: fit-content;
        cursor: pointer;
        font-size: 7px !important;
        border-radius: 10px;
      }
      .view-all:hover {
        background-color: var(--font-secondary);
    }
    `,
  ],
})
export class GlobalBtnComponent {
  @Input({ required: true }) title: string = '';
}
