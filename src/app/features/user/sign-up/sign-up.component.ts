import { AuthService } from './../../../core/services/user/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { Toast } from 'primeng/toast';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, Toast, ButtonModule],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  providers: [MessageService]
})
export class SignupComponent implements OnInit {
  
  signupForm!: FormGroup;
  showPassword = false;
  showRePassword = false;
  isSubmitting = false;
  
  constructor (private fb: FormBuilder, private authService: AuthService, private meassageService: MessageService) {}
  
  ngOnInit(): void {
    this.signupForm = this.fb.nonNullable.group({
      name: ['Ahmed Mahmoud', [Validators.required, Validators.minLength(3)]],
      email: ['ahmedmahmoud1122@gmail.com', [Validators.required, Validators.email]],
      phone: ['01212120120', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      password: ['Ahmed@2399', [Validators.required, Validators.minLength(8)]],
      rePassword: ['Ahmed@2399', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
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
    if (control?.hasError('required')) {
      return 'This field is required';
    } else if (control?.hasError('pattern') && controlName === 'phone') {
      return 'Please enter a valid Egyptian phone number (11 digits starting with 01)';
    } else if (control?.hasError('minlength')) {
      return `Minimum length is ${control.errors?.['minlength'].requiredLength} characters`;
    } else if (control?.hasError('email')) {
      return 'Please enter a valid email address';
    } else if (control?.hasError('mismatch')) {
      return 'Passwords do not match';
    }
    return '';
  }

  // Handle form submission
  onSubmit() {
    if (this.signupForm.invalid) {
      return;
    }
    this.isSubmitting = true;
    
    // Simulate API call
    setTimeout(() => {
      this.isSubmitting = false;

      this.authService.signUp(this.signupForm.value).subscribe({
        next: (response) => {
          this.meassageService.add({ severity: 'success', summary: 'Succ', detail: 'Message Content' });
        },
        error: (error) => {
          this.meassageService.add({ severity: 'error', summary: 'Error', detail: 'Message Content' });

        }
      })    

    }, 1000);
  }
}