import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.prod';
import { SignUpSendData } from '../../../models/user/sign-up/sign-up.model';
import { AuthResponseData, UserDataResponse } from '../../../models/user/user-response';
import { SignInSendData } from '../../../models/user/sign-in/sign-in.model';
import { UserUpdateRequest } from '../../../models/user/update-profile-data/update-data.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);

  // Sign up new user
  signUp(userData: SignUpSendData): Observable<UserDataResponse> {
    return this.http.post<UserDataResponse>(`${environment.baseApi}auth/signup`, userData);
  }

  // Sign up new user
  signIn(userData: SignInSendData): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(`${environment.baseApi}auth/signin`, userData)
  }

  // Verify Token
  verifyToken(): Observable<any> {    
    return this.http.get<any>(`${environment.baseApi}auth/verifyToken`);
  }

  // Get User Data by user id
  getUserData (userId: string): Observable<any>{
    return this.http.get<any>(`${environment.baseApi}users/`+ userId);
  } 
  
  // Update user profile data
  updateUserData (data: Partial<UserUpdateRequest>): Observable<AuthResponseData> {
    return this.http.put<AuthResponseData>(`${environment.baseApi}users/updateMe`, data);
  }
}