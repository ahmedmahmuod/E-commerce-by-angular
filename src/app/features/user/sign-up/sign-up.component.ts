import { AuthService } from './../../../core/services/user/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { Observable, of, timer } from 'rxjs';
import { ButtonComponent } from "../../../shared/components/buttons/loading-button/loading-btn.component";
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from '../../../core/services/language.service';
@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterLink,
        ToastModule,
        ButtonModule,
        ButtonComponent,
        TranslateModule
    ],
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css'],
    providers: [MessageService]
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  showPassword = false;
  showRePassword = false;
  isSubmitting = false;
  currentLang$!: Observable<string>;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private messageService: MessageService,
    private router: Router,
    private langService: LanguageService
  ) {}

  ngOnInit(): void {
  this.langService.currentLanguage$.subscribe((lang) => {
    this.currentLang$ = of(lang)  
  })
  
    this.signupForm = this.fb.nonNullable.group(
      {
        name: [
          '', [Validators.required, Validators.minLength(3)]
        ],
        email: [
          '', [Validators.required, Validators.email,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')],
        ],
        phone: [
          '', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)],
        ],
        password: [
          '', [Validators.required, Validators.minLength(8)],
        ],
        rePassword: [
          '', [Validators.required]
        ],
      },
      { validators: this.passwordMatchValidator }
    );
  }

  // Custom validator to check if password and confirm password match
  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const rePassword = control.get('rePassword')?.value;
    return password === rePassword ? null : { mismatch: true };
  }

  // Toggle password visibility
  togglePasswordVisibility(field: string) {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else if (field === 'rePassword') {
      this.showRePassword = !this.showRePassword;
    }
  }

  // Get error message for form controls
  getErrorMessage(controlName: string): string {
    const control = this.signupForm.get(controlName);
    let lang: string = 'en'; 
    this.currentLang$.subscribe((value) => lang = value); 

    if (control?.hasError('required')) {
      return lang === 'en' ? 'This field is required' : 'هذا الحقل مطلوب';
    } else if (control?.hasError('pattern') && controlName === 'phone') {
      return lang === 'en' ? 'Please enter a valid Egyptian phone number (11 digits starting with 01)' : 'من فضلك أدخل رقم هاتف مصري صحيح (11 رقمًا تبدأ بـ 01)';
    } else if (control?.hasError('minlength')) {
      const requiredLength = control.errors?.['minlength'].requiredLength;
      return lang === 'en' ? `Minimum length is ${requiredLength} characters` : `الحد الأدنى للطول هو ${requiredLength} حرفًا`;
    } else if (control?.hasError('email')) {
      return lang === 'en' ? 'Please enter a valid email address' : 'من فضلك أدخل عنوان بريد إلكتروني صحيح';
    } else if (control?.hasError('mismatch')) {
      return lang === 'en' ? 'Passwords do not match' : 'كلمات المرور غير متطابقة';
    }
    return '';
  }

  // Handle form submission
  onSubmit() {
    let lang: string = 'en'; 
    this.currentLang$.subscribe((value) => lang = value); 

    if (this.signupForm.invalid) {
      return;
    }
    this.isSubmitting = true;

    // Simulate API call

    timer(1000).subscribe(() => {
      this.isSubmitting = false;

      // if created acc success
      this.authService.signUp(this.signupForm.value).subscribe({
        
        next: () => {
          if (lang === 'en') {
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Account created successfully', life: 5000 });
          } else {
            this.messageService.add({ severity: 'success', summary: 'تم بنجاح', detail: 'تم انشاء حسابك بنجاح', life: 5000 });
          }

          this.signupForm.reset();
          timer(3000).subscribe(() => this.router.navigate(['/user/login']))
        },

        // if created acc failed
        error: (error) => {
          if (lang === 'en') {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message, life: 5000 });
          } else {
            console.log(error);
            if (error.status === 409) {
              this.messageService.add({ severity: 'error', summary: 'حدث خطأ', detail: 'هذا المستخدم موجود بالفعل', life: 5000 });
            } else {
              this.messageService.add({ severity: 'error', summary: 'حدث خطأ', detail: error.error.message, life: 5000 });
            }
          }
        },
      });
    })
     
  }
}
