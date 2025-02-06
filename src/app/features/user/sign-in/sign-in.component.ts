import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Observable, of, timer } from 'rxjs';
import { AuthService } from '../../../core/services/user/services/auth.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { TokenService } from '../../../core/services/user/services/token.service';
import { UserService } from '../../../core/services/user/services/user.service';
import { ButtonComponent } from "../../../shared/components/buttons/loading-button/loading-btn.component";
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../core/services/language.service';
@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, ButtonModule, ToastModule, ButtonComponent, TranslateModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
  providers: [MessageService],
})
export class SignInComponent {
  private tokenService = inject(TokenService);
  private authService = inject(AuthService);
  private userService = inject(UserService);
  private router = inject(Router);
  private langService = inject(LanguageService);

  loginForm: FormGroup;
  showPassword = false;
  isSubmitting = false;
  currentLang$!: Observable<string>;

  constructor(private fb: FormBuilder, private messageService: MessageService) {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
      ]],
      password: ['', [Validators.required]]
    });

    this.langService.currentLanguage$.subscribe((lang) => {
      this.currentLang$ = of(lang)  
    })
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    let lang: string = 'en'; 
    this.currentLang$.subscribe((value) => lang = value); 


    if (!control?.errors || !control.touched) return '';

    if (field === 'email') {
      if (control.errors['required']) return lang === 'en' ? 'Email is required' : 'البريد الإلكتروني مطلوب';
      if (control.errors['email'] || control.errors['pattern']) return lang === 'en' ? 'Please enter a valid email': 'أدخل بريد الكتروني صحيح';
    }

    if (field === 'password') {
      if (control.errors['required']) return lang === 'en' ? 'Password is required' : 'كلمة المرور مطلوبة';
      if (control.errors['minlength']) return lang === 'en' ? 'Password must be at least 8 characters' : 'كلمة المرور يجب أن تكون على الأقل 8 حروف';
      if (control.errors['pattern']) {
        return lang === 'en' ? 
        'Password must contain at least one uppercase letter, one lowercase letter, and one number' : 
        'كلمة المرور يجب أن تحتوي على حرف كبير واحد وحرف صغير واحد ورقم واحد على الأقل';
      }
    }
    return '';
  }

  onSubmit() {
    let lang: string = 'en'; 
    this.currentLang$.subscribe((value) => lang = value); 

    if (this.loginForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
  
      // Simulate API call
      timer(500).subscribe(() => {
        this.isSubmitting = false;
  
        // Call API to send login data
        this.authService.signIn(this.loginForm.value).subscribe({

          // If user logged in successfully
          next: (res) => {
            if (res.token) {
              this.tokenService.setToken(res.token);
            }

            // Show toaster message after navigation
            if (lang === 'en') {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: `Login successfuly, Welcome ${res.user.name}`, life: 5000 });
            } else {
              this.messageService.add({ severity: 'success', summary: 'تم بنجاح', detail: `تم تسجيل الدخول بنجاح، مرحباً بك ${res.user.name}`, life: 5000 });
            }

            timer(2000).subscribe(() => {
              this.authService.verifyToken().subscribe((res) => {
                this.authService.getUserData(res.decoded.id).subscribe((userData) => {
                  this.userService.setUserData(userData);
                  this.router.navigate(['/home']);
                })             
              })
            })
          },
  
          // If login failed
          error: (err) => {
            if (lang === 'en') {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: `Login failed, ${err.error.message}`, life: 5000 });
            } else {
              if (err.status === 401 ) {
                this.messageService.add({ severity: 'error', summary: 'فشل تسجيل الدخول', detail: 'البريد الإلكتروني او كلمة المرور خاطئة', life: 5000 });
              } else {                
                this.messageService.add({ severity: 'error', summary: 'فشل تسجيل الدخول', detail: `Login failed, ${err.error.message}`, life: 5000 });
              }
            }
          },
        });
      });
    } else {
      Object.keys(this.loginForm.controls).forEach((key) => {
        const control = this.loginForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
}
