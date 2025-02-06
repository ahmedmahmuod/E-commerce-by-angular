import { Component } from '@angular/core';
import { PageTitleComponent } from "../../shared/components/page-title/page-title.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [PageTitleComponent, TranslateModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent {

}
