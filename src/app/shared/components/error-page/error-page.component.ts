import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-not-found',
    imports: [RouterLink, TranslateModule],
    template: `
    <div class="error-container">
      <div class="error-content">
        <div class="glitch" data-text="404">404</div>
        <div class="error-message">
          <br />
          <h2>{{'Pages.Error_Page.Title' | translate}}</h2>
          <a routerLink="/" class="home-button">{{'Pages.Error_Page.Link' | translate}}</a>
        </div>
      </div>
    </div>
  `,
    styles: [
        `
    .error-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Arial', sans-serif;
      overflow: hidden;
      position: relative;
    }

    .error-content {
      text-align: center;
      color: var(--font-secondary);
      padding: 2rem;
      position: relative;
      z-index: 1;
    }

    .glitch {
      font-size: 8rem;
      font-weight: bold;
      position: relative;
      text-shadow: 0.05em 0 0 var(--font-main), -0.03em -0.04em 0 var(--font-secondary);
      animation: glitch 725ms infinite;
    }

    .glitch span {
      position: absolute;
      top: 0;
      left: 0;
    }

    .error-message {
      margin-top: 2rem;
    }

    .error-message h2 {
      font-size: 2rem;
      margin-bottom: 1rem;
      color: var(--font-secondary);
      font-family: var(--font-family);

    }

    .error-message p {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      color: #ffffff99;
    }

    .home-button {
      display: inline-block;
      padding: .5rem 1rem;
      background: var(--font-main);
      color: white;
      text-decoration: none;
      border-radius: 30px;
      font-weight: bold;
      transition: transform 0.3s ease;
    }

    .home-button:hover {
      transform: scale(1.02);
    }


    @keyframes glitch {
      0% {
        text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff,
                     0.025em 0.04em 0 #fffc00;
      }
      15% {
        text-shadow: 0.05em 0 0 #00fffc, -0.03em -0.04em 0 #fc00ff,
                     0.025em 0.04em 0 #fffc00;
      }
      16% {
        text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.035em 0 #fc00ff,
                     -0.05em -0.05em 0 #fffc00;
      }
      49% {
        text-shadow: -0.05em -0.025em 0 #00fffc, 0.025em 0.035em 0 #fc00ff,
                     -0.05em -0.05em 0 #fffc00;
      }
      50% {
        text-shadow: 0.05em 0.035em 0 #00fffc, 0.03em 0 0 #fc00ff,
                     0 -0.04em 0 #fffc00;
      }
      99% {
        text-shadow: 0.05em 0.035em 0 #00fffc, 0.03em 0 0 #fc00ff,
                     0 -0.04em 0 #fffc00;
      }
      100% {
        text-shadow: -0.05em 0 0 #00fffc, -0.025em -0.04em 0 #fc00ff,
                     -0.04em -0.025em 0 #fffc00;
      }
    }

    @keyframes float {
      0% {
        transform: translateY(0px) rotate(0deg);
      }
      50% {
        transform: translateY(-20px) rotate(5deg);
      }
      100% {
        transform: translateY(0px) rotate(0deg);
      }
    }

    @media (max-width: 768px) {
      .glitch {
        font-size: 4rem;
      }

      .error-message h2 {
        font-size: 1.5rem;
      }

      .error-message p {
        font-size: 1rem;
      }

      .astronaut {
        right: 10%;
        transform: scale(0.8);
      }
    }

    @media (max-width: 480px) {
      .glitch {
        font-size: 3rem;
      }

      .astronaut {
        display: none;
      }
    }
  `,
    ]
})
export class NotFoundComponent {}
