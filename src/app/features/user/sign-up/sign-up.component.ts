import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  showPassword = false;
  showRePassword = false;
  isSubmitting = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signupForm = this.fb.nonNullable.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      rePassword: ['', [Validators.required]]
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
      console.log('Form submitted:', this.signupForm.value);
      this.isSubmitting = false;
    }, 2000);
  }
}