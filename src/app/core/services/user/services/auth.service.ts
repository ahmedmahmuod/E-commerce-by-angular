import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.prod';
import { SignUpSendData } from '../../../models/user/sign-up/sign-up.model';
import { UserResponse } from '../../../models/user/user-response';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

// Sign up new user
  signUp(userData: SignUpSendData): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${environment.baseApi}auth/signup`, userData);
  }
}
