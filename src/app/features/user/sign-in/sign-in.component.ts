import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {
  loginForm: FormGroup;
  showPassword = false;
  isSubmitting = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
      ]],
      password: ['', [
        Validators.required,
      ]]
    });
  }

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    if (!control?.errors || !control.touched) return '';

    if (field === 'email') {
      if (control.errors['required']) return 'Email is required';
      if (control.errors['email'] || control.errors['pattern']) return 'Please enter a valid email';
    }

    if (field === 'password') {
      if (control.errors['required']) return 'Password is required';
      if (control.errors['minlength']) return 'Password must be at least 8 characters';
      if (control.errors['pattern']) {
        return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
      }
    }
    return '';
  }

  onSubmit() {
    if (this.loginForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;

      // Simulate API call
      console.log('Login attempt:', this.loginForm.value);

      setTimeout(() => {
        this.isSubmitting = false;
        // Handle successful login here
      }, 1500);
    } else {
      Object.keys(this.loginForm.controls).forEach(key => {
        const control = this.loginForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  forgotPassword(event: Event) {
    event.preventDefault();
    // Handle forgot password logic here
    console.log('Forgot password clicked');
  }

  signUp(event: Event) {
    event.preventDefault();
    // Handle sign up navigation here
    console.log('Sign up clicked');
  }
}
