import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthResponseData } from '../../../models/user/user-response';
import { environment } from '../../../../../environments/environment.prod';
import { PasswordReqModel } from '../../../models/user/password/password.model';

@Injectable({
  providedIn: 'root',
})
export class PasswordService {
  private http = inject(HttpClient);
  
  // send new password and change password
  changePassword(passwordData: PasswordReqModel): Observable<AuthResponseData> {
    return this.http.put<AuthResponseData>(environment.baseApi + 'users/changeMyPassword', passwordData)
  }
}