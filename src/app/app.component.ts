import { Component } from '@angular/core';
import { HeaderComponent } from "./core/components/header/header.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "./core/components/footer/footer.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent { }




