import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-title',
  standalone: true,
  template: `
    <div class="centered-text">
      <h2 class="section-title">{{ title }}</h2>
    </div>
  `,
  styles: [
    `
      .centered-text {
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .section-title {
        color: var(--font-secondary);
        font-size: 35px;
        text-align: center;
        margin-bottom: 20px;
        font-family: var(--font-family);
        font-weight: 600;
        position: relative;
        display: inline-block;
        padding-bottom: 10px;
      }
      .section-title::after {
        content: '';
        position: absolute;
        left: 50%;
        bottom: 0;
        width: 60px;
        height: 3px;
        background-color: var(--font-main);
        transform: translateX(-50%);
        transition: width 0.3s ease;
      }

      .section-title:hover::after {
        width: 100%;
        background-color: var(--bg-secondary);
      }

      .section-title:hover {
        color: var(--bg-secondary);
        transition: color 0.3s ease;
      }
    `,
  ],
})
export class PageTitleComponent {
  @Input({ required: true }) title: string = '';
}
