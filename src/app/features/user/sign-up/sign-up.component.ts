import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signupForm: FormGroup;
  showPassword = false;
  showRePassword = false;
  isSubmitting = false;

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')
      ]],
      phone: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{11}$')
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')
      ]],
      rePassword: ['', [Validators.required]]
    }, {
      validators: (control) => {
        const password = control.get('password');
        const rePassword = control.get('rePassword');
        if (password?.value !== rePassword?.value) {
          return { passwordMismatch: true };
        }
        return null;
      }
    });
  }

  togglePasswordVisibility(field: 'password' | 'rePassword') {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showRePassword = !this.showRePassword;
    }
  }

  getErrorMessage(field: string): string {
    const control = this.signupForm.get(field);
    if (!control?.errors || !control.touched) return '';

    switch (field) {
      case 'name':
        if (control.errors['required']) return 'Name is required';
        if (control.errors['minlength']) return 'Name must be at least 3 characters';
        break;
      case 'email':
        if (control.errors['required']) return 'Email is required';
        if (control.errors['email'] || control.errors['pattern']) return 'Please enter a valid email';
        break;
      case 'phone':
        if (control.errors['required']) return 'Phone number is required';
        if (control.errors['pattern']) return 'Please enter a valid 11-digit phone number';
        break;
      case 'password':
        if (control.errors['required']) return 'Password is required';
        if (control.errors['minlength']) return 'Password must be at least 8 characters';
        if (control.errors['pattern']) {
          return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
        }
        break;
      case 'rePassword':
        if (control.errors['required']) return 'Please confirm your password';
        if (this.signupForm.errors?.['passwordMismatch']) return 'Passwords do not match';
        break;
    }
    return '';
  }

  onSubmit() {
    if (this.signupForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      console.log('Form data:', this.signupForm.value);

      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
      }, 1500);
    } else {
      Object.keys(this.signupForm.controls).forEach(key => {
        const control = this.signupForm.get(key);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  login(event: Event) {
    event.preventDefault();
    console.log('Navigate to login');
  }
}