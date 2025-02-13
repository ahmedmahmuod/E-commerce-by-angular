import { Component } from '@angular/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
    selector: 'app-spinner',
    imports: [NzSpinModule],
    standalone: true,
    templateUrl: './spinner.component.html',
    styleUrl: './spinner.component.css'
})
export class SpinnerComponent {

}
