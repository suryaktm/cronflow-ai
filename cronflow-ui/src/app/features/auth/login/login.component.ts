import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  isLoading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    if (this.username && this.password) {
      this.isLoading = true;
      this.errorMessage = '';

      this.authService.login({ username: this.username, password: this.password }).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/dashboard']);
        },
        error: (err: any) => {
          this.isLoading = false;
          const status = err.status || 'Unknown';
          const msg = err.error?.message || err.message || 'Error';
          this.errorMessage = `Login Failed: Status ${status} - ${msg}`;
          console.error('Login error details:', err);
        }
      });
    }
  }
}
