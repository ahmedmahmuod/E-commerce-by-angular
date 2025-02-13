import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-view-product',
    standalone: true,
    imports: [TranslateModule],
    templateUrl: './view-product.component.html',
    styleUrl: './view-product.component.css'
})
export class ViewProductComponent { }
