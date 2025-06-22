import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <h1>Competition Management System</h1>
          <p>Sign in to access your dashboard</p>
        </div>
        
        <form (ngSubmit)="onSubmit()" class="login-form">
          <div class="form-group">
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              [(ngModel)]="username"
              required
              class="form-control"
              placeholder="Enter your username"
            >
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              [(ngModel)]="password"
              required
              class="form-control"
              placeholder="Enter your password"
            >
          </div>
          
          <button type="submit" class="btn-login" [disabled]="loading">
            <span *ngIf="loading" class="spinner"></span>
            {{ loading ? 'Signing in...' : 'Sign In' }}
          </button>
          
          <div *ngIf="error" class="error-message">
            {{ error }}
          </div>
        </form>
        
        <div class="demo-accounts">
          <h3>Demo Accounts:</h3>
          <div class="demo-account">
            <strong>Admin:</strong> admin / admin
          </div>
          <div class="demo-account">
            <strong>Club Manager:</strong> manager / manager
          </div>
          <div class="demo-account">
            <strong>Player:</strong> player / player
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #1976D2 0%, #42A5F5 100%);
      padding: 20px;
    }

    .login-card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      padding: 40px;
      width: 100%;
      max-width: 400px;
      animation: fadeInUp 0.6s ease-out;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    .login-header {
      text-align: center;
      margin-bottom: 32px;
    }

    .login-header h1 {
      color: #1976D2;
      font-size: 24px;
      font-weight: 700;
      margin-bottom: 8px;
    }

    .login-header p {
      color: #757575;
      font-size: 14px;
    }

    .login-form {
      margin-bottom: 24px;
    }

    .form-group {
      margin-bottom: 20px;
    }

    .form-group label {
      display: block;
      margin-bottom: 6px;
      color: #333;
      font-weight: 500;
      font-size: 14px;
    }

    .form-control {
      width: 100%;
      padding: 12px 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      font-size: 14px;
      transition: all 0.3s ease;
      background-color: #fafafa;
    }

    .form-control:focus {
      outline: none;
      border-color: #1976D2;
      background-color: white;
      box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.1);
    }

    .btn-login {
      width: 100%;
      padding: 14px;
      background: #1976D2;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
    }

    .btn-login:hover:not(:disabled) {
      background: #1565C0;
      transform: translateY(-1px);
      box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
    }

    .btn-login:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }

    .spinner {
      width: 16px;
      height: 16px;
      border: 2px solid #ffffff;
      border-top: 2px solid transparent;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    .error-message {
      background: #ffebee;
      color: #c62828;
      padding: 12px;
      border-radius: 6px;
      margin-top: 16px;
      font-size: 14px;
      text-align: center;
      border: 1px solid #ffcdd2;
    }

    .demo-accounts {
      border-top: 1px solid #e0e0e0;
      padding-top: 20px;
    }

    .demo-accounts h3 {
      color: #333;
      font-size: 16px;
      margin-bottom: 12px;
      text-align: center;
    }

    .demo-account {
      background: #f8f9fa;
      padding: 8px 12px;
      border-radius: 6px;
      margin-bottom: 6px;
      font-size: 13px;
      color: #666;
    }

    .demo-account strong {
      color: #1976D2;
    }

    @media (max-width: 480px) {
      .login-card {
        padding: 24px;
        margin: 0 12px;
      }
    }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  loading = false;
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit() {
    if (!this.username || !this.password) {
      this.error = 'Please enter both username and password';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login(this.username, this.password).subscribe(
      (success) => {
        this.loading = false;
        if (success) {
          const user = this.authService.getCurrentUser();
          if (user) {
            switch (user.profile) {
              case 'ADMIN':
                this.router.navigate(['/admin']);
                break;
              case 'CLUB_MANAGER':
                this.router.navigate(['/club-manager']);
                break;
              case 'PLAYER':
                this.router.navigate(['/player']);
                break;
              default:
                this.router.navigate(['/admin']);
            }
          }
        } else {
          this.error = 'Invalid username or password';
        }
      },
      (error) => {
        this.loading = false;
        this.error = 'Login failed. Please try again.';
      }
    );
  }
}