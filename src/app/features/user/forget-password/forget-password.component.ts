import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {
  forgotPasswordForm: FormGroup;
  isSubmitting = false;
  isEmailSent = false;

  constructor(private fb: FormBuilder) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
      ]]
    });
  }

  getErrorMessage(): string {
    const control = this.forgotPasswordForm.get('email');
    if (!control?.errors || !control.touched) return '';

    if (control.errors['required']) return 'Email is required';
    if (control.errors['email'] || control.errors['pattern']) return 'Please enter a valid email';
    return '';
  }

  onSubmit() {
    if (this.forgotPasswordForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
        this.isEmailSent = true;
      }, 1500);
    } else {
      this.forgotPasswordForm.get('email')?.markAsTouched();
    }
  }
}