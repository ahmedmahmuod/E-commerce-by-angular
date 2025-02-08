import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { TokenService } from '../../../core/services/user/services/token.service';
import { UserService } from '../../../core/services/user/services/user.service';
import { Observable, of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'app-profile',
    imports: [RouterLink, RouterOutlet, RouterModule, CommonModule, TranslateModule],
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  private userService = inject(UserService);
  private tokenService = inject(TokenService);
  userData$: Observable<any> = of(null);
  
  ngOnInit(): void {
    this.userData$ = this.userService.userData$;    
  }

  logOut(): void {
    this.tokenService.removeToken();
  }
}