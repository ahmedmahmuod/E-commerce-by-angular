import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { ResetPasswordService } from '../../../core/services/user/services/reset-password.service';
import { ButtonComponent } from "../../../shared/components/buttons/loading-button/loading-btn.component";
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { Observable, of, timer } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/user/services/auth.service';
import { TokenService } from '../../../core/services/user/services/token.service';
import { UserService } from '../../../core/services/user/services/user.service';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../core/services/language.service';

@Component({
    selector: 'app-password-reset',
    imports: [CommonModule, ReactiveFormsModule, FormsModule, ButtonComponent, ToastModule, ButtonModule, TranslateModule],
    templateUrl: './forget-password.component.html',
    styleUrls: ['./forget-password.component.css'],
    providers: [MessageService]
})
export class PasswordResetComponent {
  // Inject services
  private messageService = inject(MessageService);
  private resetPassService = inject(ResetPasswordService);
  private authService = inject(AuthService);
  private tokenSerivce = inject(TokenService);
  private userService = inject(UserService);
  private router = inject(Router);
  private langService = inject (LanguageService);

  // Step tracker
  currentStep = 1;
  emailForm: FormGroup | any;
  newPasswordForm: FormGroup;
  verificationCode: string[] = new Array(6).fill('');
  isSubmitting = signal<boolean>(false);
  currentLang$!: Observable<string>;

  // Form group for email input
  constructor(private fb: FormBuilder) {
    this.langService.currentLanguage$.subscribe((lang) => {
      this.currentLang$ = of(lang)  
    })

    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });

    // Form group for new password with validations
    this.newPasswordForm = this.fb.group({
      newPassword: ['', [ Validators.required, Validators.minLength(8)]],
    });
  }

  // Getters for form controls
  get email() {
    return this.emailForm.value.email;
  }

  // Getters for form controls for new password
  get newPasswordControl() {
    return this.newPasswordForm.get('newPassword');
  }

  // Submit email to send verification code
  submitEmail() {
    let lang: string = 'en'; 
    this.currentLang$.subscribe((value) => lang = value); 

    if (this.emailForm.invalid) {
      return;
    } else {
      this.isSubmitting.set(true);

      this.resetPassService.resetPasswordByEmail(this.email).subscribe({
        next: () => {
          this.isSubmitting.set(false);
          if(lang === 'en') {
            this.messageService.add({ severity: 'success', summary: 'Success',  detail: 'The verification code has been sent to your email.', life: 5000 });
          } else {
            this.messageService.add({ severity: 'success', summary: 'تم بنجاح',  detail: 'لقد تم إرسال رمز التحقق إلى بريدك الإلكتروني', life: 5000 });
          }
          this.currentStep = 2;
        },
        error: () => {
          this.isSubmitting.set(false);
          if (lang === 'en') {
            this.messageService.add({ severity: 'error',  summary: 'Error', detail: 'Email not registered with us. Please try again with another email.', life: 5000 });
          } else {
            this.messageService.add({ severity: 'error',  summary: 'خطأ في ارسال البريد الإلكتروني', detail: 'البريد الإلكتروني غير مسجل لدينا. يرجى المحاولة مرة أخرى باستخدام بريد إلكتروني آخر.', life: 5000 });
          }
        },
      });
    }
  }

  // Resend the email
  resendEmail() {
    this.currentStep = 1;
  }

  // Handle code input (restrict to numbers only)
  onCodeInput(event: any, index: number) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/[^0-9]/g, '');
    this.verificationCode[index] = value;
    input.value = value;
  }

  // Handle paste event for verification code
  onPaste(event: ClipboardEvent) {
    event.preventDefault();
    const pastedText = event.clipboardData?.getData('text');
    if (pastedText) {
      const numbers = pastedText.replace(/[^0-9]/g, '').split('').slice(0, 6);
      numbers.forEach((num, index) => {
        this.verificationCode[index] = num;
      });
    }
  }

  // Submit verification code
  submitCode() {
    let lang: string = 'en'; 
    this.currentLang$.subscribe((value) => lang = value); 

    this.isSubmitting.set(true);

    // Join the array to get the code
    const code = this.verificationCode.join('');
    if (!code) {
      this.isSubmitting.set(false);
      if (lang === 'en') {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Verification code is missing', life: 5000 });
      } else {
        this.messageService.add({ severity: 'error', summary: 'حدث خطأ', detail: 'يرجى إدخال رمز التحقق', life: 5000 });
      }
      return;
    }

    // Send the code to the server
    this.resetPassService.sendVerificationCode(code).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        if (lang === 'en') {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Code verified successfully', life: 5000 });
        } else {
          this.messageService.add({ severity: 'success', summary: 'تم بنجاح', detail: ' تم التحقق من الرمز بنجاح', life: 5000 });
        }
        this.currentStep = 3;
      },
      error: (error) => {
        this.isSubmitting.set(false);
        if (error.status === 400) {
          if (lang === 'en') {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error?.message || 'An error occurred', life: 5000 });
          } else {
            this.messageService.add({ severity: 'error', summary: 'حدث خطأ', detail: 'رمز إعادة التعيين غير صالح أو انتهت صلاحيته', life: 5000 });
          }
        }
      },
    });
  }

  // Submit new password
  submitNewPassword() {
    let lang: string = 'en'; 
    this.currentLang$.subscribe((value) => lang = value); 

    if (this.newPasswordForm.invalid) {
      return;
    }
    this.isSubmitting.set(true);
    const newPassword = this.newPasswordForm.value.newPassword;

    // Send the new password to the server
    this.resetPassService.createNewPassword(this.email, newPassword).subscribe({
      next: () => {
        this.isSubmitting.set(false);
        if (lang === 'en') {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Password reset successfully', life: 5000 });
        } else {
          this.messageService.add({ severity: 'success', summary: 'تم بنجاح', detail: 'تم اعادة تعيين كلمة السر بنجاح', life: 5000 });
        }
        this.currentStep = 4;

        // Sign in the user with the new password
        this.authService.signIn({ email: this.email, password: newPassword }).subscribe((res) => {

          // If user logged in successfully
          if (res.token) {
            // Set the token
            this.tokenSerivce.setToken(res.token);

            // verify token and get user data after 2 seconds of successful login
            timer(2000).subscribe(() => {
              this.authService.verifyToken().subscribe((res) => {
                this.authService.getUserData(res.decoded.id).subscribe((userData) => {
                  this.userService.setUserData(userData);
                  this.router.navigate(['/home']);
                })             
              })
            })
          }
        });
      },
      // Handle error response
      error: (error) => {
        this.isSubmitting.set(false);
        if (error.status === 400) {
          if (lang === 'en') {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error?.message || 'An error occurred', life: 5000 });
          
          } else {
            this.messageService.add({ severity: 'error', summary: 'حدث خطأ', detail: 'حدث خطأ غير متوقع يرجى المحاولة مره اخرى', life: 5000 });
          }
      }}
    })
  }
}