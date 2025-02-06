import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../../environments/environment.prod";

@Injectable({
    providedIn: 'root'
})
export class ResetPasswordService {
    private http = inject(HttpClient);

    // Send the email to the server
    resetPasswordByEmail(email: string): Observable<responseReset> {
        return this.http.post<responseReset>(environment.baseApi + 'auth/forgotPasswords', { email });
    }

    // Send the verification code to the server
    sendVerificationCode(resetCode: string): Observable<any> {
        return this.http.post<any> (environment.baseApi + 'auth/verifyResetCode', { resetCode });
    }

    // Send the new password to the server 
    createNewPassword(email: string, newPassword: string): Observable<responseReset> {
        return this.http.put<responseReset>(environment.baseApi + 'auth/resetPassword', { email: email, newPassword: newPassword });
    }
}

// Response interface
export interface responseReset {
    statusMsg: string;
    message: string;
}