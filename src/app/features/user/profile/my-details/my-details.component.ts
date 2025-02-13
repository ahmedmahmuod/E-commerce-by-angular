import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../../../../core/services/user/services/user.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ButtonComponent } from '../../../../shared/components/buttons/loading-button/loading-btn.component';
import { AuthService } from '../../../../core/services/user/services/auth.service';
import { TokenService } from '../../../../core/services/user/services/token.service';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../../core/services/language.service';

@Component({
    selector: 'app-my-details',
    standalone: true,
    imports: [CommonModule, RouterModule, ReactiveFormsModule, ToastModule, ButtonModule, ButtonComponent, TranslateModule],
    templateUrl: './my-details.component.html',
    styleUrl: './my-details.component.css',
    providers: [MessageService]
})
export class MyDetailsComponent {
  userForm!: FormGroup;
  userData$: Observable<any> = of(null);
  isSubmitting = false;
  currentLang$!: Observable<string>;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private fb: FormBuilder,
    private userService: UserService,
    private authService: AuthService,
    private tokenService: TokenService,
    private messageService: MessageService,
    private langService: LanguageService
  ) {}

  ngOnInit() {
    this.langService.currentLanguage$.subscribe((lang) => {
      this.currentLang$ = of(lang);  
    });

    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
    });
    this.userForm.get('email')?.disable();

    this.userService.userData$.subscribe((data) => {
      this.userData$ = of(data ? data.data || null : null);
      if (data && data.data) {
        this.userForm.patchValue({ name: data.data.name, email: data.data.email, phone: data.data.phone });
      }
    });
  }

  onSubmit() {
    let lang: string = 'en';
    this.currentLang$.subscribe((value) => lang = value);

    if (this.userForm.valid) {
      this.isSubmitting = true;

      this.userData$.subscribe((userData) => {
        const formValue = this.userForm.value;
        const userDataToCompare = { name: userData.name, phone: userData.phone };

        if (formValue.name !== userDataToCompare.name || formValue.phone !== userDataToCompare.phone) {
          this.authService.updateUserData(formValue).subscribe({
            next: () => {              
              const token = this.tokenService.getToken();
              if (token) {
                this.authService.verifyToken().subscribe((res) => {
                  this.authService.getUserData(res.decoded.id).subscribe((userData) => {
                    this.userService.setUserData(userData);
                  });
                });
              }
        
              this.isSubmitting = false;
              this.messageService.add({severity: 'success', summary: lang === 'en' ? 'Success' : 'تم بنجاح', detail: lang === 'en' ? 'Your details have been updated successfully' : 'تم تعديل تفاصيلك بنجاح'});
            },
            error: (error) => {
              console.log(error);
              this.isSubmitting = false;
              this.messageService.add({severity: 'error', summary: 'Error', detail: error.error.errors.msg});
            },
          });
        } else {
          this.isSubmitting = false;
          this.messageService.add({severity: 'info', summary: lang === 'en' ? 'No Changes Detected!' : 'لم يتم اكتشاف أي تغييرات', detail: lang === 'en' ? 'You have not made any changes.!!' : 'لم تقم بأية تغييرات.!!'});
        }
      });
    }
  }

  getErrorMessage(controlName: string): string {
    const control = this.userForm.get(controlName);
    let lang = 'en';
    
    if (isPlatformBrowser(this.platformId)) {
      lang = localStorage.getItem('language') || 'en';
    }

    if (control?.hasError('required')) {
      return lang === 'ar' ? 'هذا الحقل مطلوب' : 'This field is required';
    } else if (control?.hasError('pattern') && controlName === 'phone') {
      return lang === 'ar' ? 'يرجى إدخال رقم هاتف مصري صالح (11 رقمًا تبدأ بـ 01)' : 'Please enter a valid Egyptian phone number (11 digits starting with 01)';
    } else if (control?.hasError('minlength')) {
      return lang === 'ar' ? `الحد الأدنى للطول هو ${control.errors?.['minlength'].requiredLength} حرف` : `Minimum length is ${control.errors?.['minlength'].requiredLength} characters`;
    } else if (control?.hasError('email')) {
      return lang === 'ar' ? 'يرجى إدخال عنوان بريد إلكتروني صالح' : 'Please enter a valid email address';
    } else if (control?.hasError('mismatch')) {
      return lang === 'ar' ? 'كلمات المرور غير متطابقة' : 'Passwords do not match';
    }
    return '';
  }
}
