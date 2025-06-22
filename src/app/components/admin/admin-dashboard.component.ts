import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <div class="admin-layout">
      <nav class="sidebar">
        <div class="sidebar-header">
          <h2>Admin Panel</h2>
          <p>Competition Management</p>
        </div>
        
        <ul class="sidebar-menu">
          <li>
            <a routerLink="/admin/dashboard" routerLinkActive="active">
              <i class="icon">📊</i>
              <span>Dashboard</span>
            </a>
          </li>
          <li>
            <a routerLink="/admin/competitions" routerLinkActive="active">
              <i class="icon">🏆</i>
              <span>Competitions</span>
            </a>
          </li>
          <li>
            <a routerLink="/admin/matches" routerLinkActive="active">
              <i class="icon">🎾</i>
              <span>Matches</span>
            </a>
          </li>
          <li>
            <a routerLink="/admin/clubs" routerLinkActive="active">
              <i class="icon">🏢</i>
              <span>Clubs</span>
            </a>
          </li>
          <li>
            <a routerLink="/admin/players" routerLinkActive="active">
              <i class="icon">👤</i>
              <span>Players</span>
            </a>
          </li>
          <li>
            <a routerLink="/admin/halls" routerLinkActive="active">
              <i class="icon">🏟️</i>
              <span>Halls</span>
            </a>
          </li>
        </ul>
        
        <div class="sidebar-footer">
          <button class="logout-btn" (click)="logout()">
            <i class="icon">🚪</i>
            <span>Logout</span>
          </button>
        </div>
      </nav>
      
      <main class="main-content">
        <header class="top-header">
          <div class="header-left">
            <h1>Competition Management System</h1>
          </div>
          <div class="header-right">
            <div class="user-info">
              <span class="user-name">Administrator</span>
              <div class="user-avatar">A</div>
            </div>
          </div>
        </header>
        
        <div class="content-area">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .admin-layout {
      display: flex;
      height: 100vh;
      background-color: #f5f5f5;
    }

    .sidebar {
      width: 260px;
      background: linear-gradient(180deg, #1976D2 0%, #1565C0 100%);
      color: white;
      display: flex;
      flex-direction: column;
      box-shadow: 2px 0 10px rgba(0,0,0,0.1);
    }

    .sidebar-header {
      padding: 24px 20px;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }

    .sidebar-header h2 {
      font-size: 20px;
      font-weight: 700;
      margin-bottom: 4px;
    }

    .sidebar-header p {
      font-size: 13px;
      opacity: 0.8;
    }

    .sidebar-menu {
      flex: 1;
      list-style: none;
      padding: 20px 0;
    }

    .sidebar-menu li {
      margin-bottom: 4px;
    }

    .sidebar-menu a {
      display: flex;
      align-items: center;
      padding: 12px 20px;
      color: rgba(255,255,255,0.8);
      text-decoration: none;
      transition: all 0.3s ease;
      border-radius: 0 25px 25px 0;
      margin-right: 20px;
    }

    .sidebar-menu a:hover {
      background: rgba(255,255,255,0.1);
      color: white;
    }

    .sidebar-menu a.active {
      background: rgba(255,255,255,0.15);
      color: white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .sidebar-menu .icon {
      font-size: 18px;
      margin-right: 12px;
      width: 20px;
    }

    .sidebar-footer {
      padding: 20px;
      border-top: 1px solid rgba(255,255,255,0.1);
    }

    .logout-btn {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 12px 16px;
      background: rgba(255,255,255,0.1);
      border: 1px solid rgba(255,255,255,0.2);
      color: white;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .logout-btn:hover {
      background: rgba(255,255,255,0.2);
    }

    .logout-btn .icon {
      margin-right: 8px;
    }

    .main-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .top-header {
      background: white;
      padding: 0 24px;
      height: 64px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      z-index: 10;
    }

    .header-left h1 {
      font-size: 20px;
      color: #333;
      font-weight: 600;
    }

    .header-right {
      display: flex;
      align-items: center;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .user-name {
      font-size: 14px;
      color: #666;
      font-weight: 500;
    }

    .user-avatar {
      width: 36px;
      height: 36px;
      background: #1976D2;
      color: white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 14px;
    }

    .content-area {
      flex: 1;
      overflow-y: auto;
      padding: 24px;
    }

    @media (max-width: 768px) {
      .admin-layout {
        flex-direction: column;
      }
      
      .sidebar {
        width: 100%;
        height: auto;
        position: fixed;
        top: 0;
        left: -100%;
        z-index: 1000;
        transition: left 0.3s ease;
      }
      
      .main-content {
        margin-left: 0;
      }
      
      .content-area {
        padding: 16px;
      }
    }
  `]
})
export class AdminDashboardComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}