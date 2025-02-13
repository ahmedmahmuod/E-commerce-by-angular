import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { MessageService } from 'primeng/api';
import { ButtonComponent } from "../../../../shared/components/buttons/loading-button/loading-btn.component";
import { PasswordService } from '../../../../core/services/user/services/password.service';
import { TokenService } from '../../../../core/services/user/services/token.service';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import { LanguageService } from '../../../../core/services/language.service';
@Component({
    selector: 'app-change-password',
    standalone: true,
    imports: [CommonModule, RouterModule, ToastModule, ButtonModule, ReactiveFormsModule, ButtonComponent, TranslateModule],
    templateUrl: './change-password.component.html',
    styleUrl: './change-password.component.css',
    providers: [MessageService]
})
export class PasswordChangeComponent {
  private passwordService = inject(PasswordService);
  private tokenService = inject(TokenService);
  private messageService = inject(MessageService);
  private langService = inject(LanguageService);
  private platformId = inject(PLATFORM_ID);

  currentLang$!: Observable<string>;
  passwordForm: FormGroup;
  isSubmitting = false;

  // Variables to control password visibility
  showCurrentPassword = false;
  showNewPassword = false;
  showConfirmPassword = false;

  constructor(private fb: FormBuilder) {    
    this.langService.currentLanguage$.subscribe((lang) => {
      this.currentLang$ = of(lang)  
    })

    this.passwordForm = this.fb.group({
      currentPassword: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rePassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  // Toggle password visibility
  togglePasswordVisibility(field: string) {
    if (field === 'currentPassword') {
      this.showCurrentPassword = !this.showCurrentPassword;
    } else if (field === 'password') {
      this.showNewPassword = !this.showNewPassword;
    } else if (field === 'rePassword') {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  passwordMatchValidator(form: FormGroup) {
    return form.get('password')?.value === form.get('rePassword')?.value
      ? null : { mismatch: true };
  }

  getErrorMessage(controlName: string) {
    const control = this.passwordForm.get(controlName);
    if (control?.hasError('required')) {
      if (isPlatformBrowser(this.platformId)) {
        if (localStorage.getItem('language') === 'en') {
          return 'This field is required';
        } else {
          return 'هذا الحقل مطلوب'
        }
      }
    }
    if (control?.hasError('minlength')) {
      if (isPlatformBrowser(this.platformId)) {
        if (localStorage.getItem('language') === 'en') {
          return 'Password must be at least 8 characters long';
        } else {
          return 'يجب أن تكون كلمة المرور على الأقل 8 أحرف'
        }
      }
      
    }
    if (control?.hasError('mismatch')) {
      if (isPlatformBrowser(this.platformId)) {
        if (localStorage.getItem('language') === 'en') {
          return 'Passwords do not match';
        } else {
          return 'لا يوجد تطابق بين كلمات المرور'
        }
      }
    }
    return '';
  }

  onPasswordSubmit() {
    let lang: string = 'en'; 
    this.currentLang$.subscribe((value) => lang = value); 

    if (this.passwordForm.invalid) {
      return;
    }
    this.isSubmitting = true;    

  // call password service to send data and handle response
  this.passwordService.changePassword(this.passwordForm.value).subscribe(
    (res) => {
      this.isSubmitting = false;
      if (res.token) {
        this.tokenService.setToken(res.token);
      }

      if (lang === 'en') {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Your password has been changed successfully!' });
      } else {
        this.messageService.add({ severity: 'success', summary: 'تم بنجاح', detail: 'تم تغيير كلمة السر بنجاح' });
      }
    },

    (error) => {
      this.isSubmitting = false;
      const errorMessage = error.error?.errors?.msg || 'An unexpected error occurred. Please try again.';
      this.messageService.add({ severity: 'error', summary: 'Error', detail: errorMessage });
    }
  );

    // reset the form after change password
    this.passwordForm.reset();
  }
}