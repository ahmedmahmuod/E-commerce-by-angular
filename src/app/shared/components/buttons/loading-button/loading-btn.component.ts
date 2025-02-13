import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-button-loading',
    imports: [CommonModule],
    standalone: true,
    template: `
    <button [ngClass]="background" [type]="type" [disabled]="disabled || loading" class="submit-button">
      <span *ngIf="!loading">{{ text }}</span>
      <span *ngIf="loading" class="spinner"></span>
    </button>
  `,
    styles: [
        `
      .submit-button {
        padding: 10px 20px;
        font-size: 16px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        color: white;
        transition: 0.3s ease;
        width: 100%;
      }
      .submit-button:hover {
        opacity: 0.8;
      }

      .submit-button:disabled {
        background-color: var(--font-third);
        cursor: not-allowed;
      }

      .spinner {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        border-top-color: #ffffff;
        animation: spin 1s ease-in-out infinite;
      }

      @keyframes spin {
        to {
          transform: rotate(360deg);
        }
      }

      .background-main {
        background-color: var(--font-main);
      }
      .background-second {
        background-color: var(--font-secondary);
      }
    `,
    ]
})
export class ButtonComponent {
  @Input({ required: true }) text: string = 'Button';
  @Input() background: string = 'background-main';
  @Input() type: string = 'submit'; 
  @Input({ required: true }) loading: boolean = false; 
  @Input({ required: true }) disabled: boolean = false;
}
