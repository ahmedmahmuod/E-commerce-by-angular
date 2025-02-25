import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-add-to-cart-button',
    imports: [CommonModule, TranslateModule],
    standalone: true,
    templateUrl: './add-to-cart.component.html',
    styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent {}
