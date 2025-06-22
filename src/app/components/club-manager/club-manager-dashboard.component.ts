import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-club-manager-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="club-manager-layout">
      <nav class="sidebar">
        <div class="sidebar-header">
          <h2>Club Manager</h2>
          <p>Tennis Club Management</p>
        </div>
        
        <ul class="sidebar-menu">
          <li><a href="#" class="active"><i class="icon">📊</i><span>Dashboard</span></a></li>
          <li><a href="#"><i class="icon">👥</i><span>My Players</span></a></li>
          <li><a href="#"><i class="icon">🎾</i><span>Matches</span></a></li>
          <li><a href="#"><i class="icon">🏆</i><span>Competitions</span></a></li>
          <li><a href="#"><i class="icon">📅</i><span>Schedule</span></a></li>
          <li><a href="#"><i class="icon">📈</i><span>Reports</span></a></li>
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
            <h1>Club Manager Dashboard</h1>
          </div>
          <div class="header-right">
            <div class="user-info">
              <span class="user-name">Club Manager</span>
              <div class="user-avatar">CM</div>
            </div>
          </div>
        </header>
        
        <div class="content-area">
          <div class="dashboard-content">
            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-icon">👥</div>
                <div class="stat-content">
                  <h3>24</h3>
                  <p>Club Players</p>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">🎾</div>
                <div class="stat-content">
                  <h3>12</h3>
                  <p>Active Matches</p>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">🏆</div>
                <div class="stat-content">
                  <h3>3</h3>
                  <p>Competitions</p>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon">📅</div>
                <div class="stat-content">
                  <h3>8</h3>
                  <p>This Week</p>
                </div>
              </div>
            </div>

            <div class="content-grid">
              <div class="card">
                <div class="card-header">
                  <h2>Recent Matches</h2>
                </div>
                <div class="card-content">
                  <div class="match-list">
                    <div class="match-item">
                      <div class="match-info">
                        <h4>John Smith vs Mike Johnson</h4>
                        <p>Championship Quarter Final</p>
                      </div>
                      <div class="match-result">
                        <span class="score">6-4, 6-2</span>
                      </div>
                    </div>
                    <div class="match-item">
                      <div class="match-info">
                        <h4>Sarah Davis vs Emma Wilson</h4>
                        <p>League Match</p>
                      </div>
                      <div class="match-result">
                        <span class="score">7-5, 3-6, 6-4</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card">
                <div class="card-header">
                  <h2>Upcoming Schedule</h2>
                </div>
                <div class="card-content">
                  <div class="schedule-list">
                    <div class="schedule-item">
                      <div class="schedule-time">
                        <span class="date">Today</span>
                        <span class="time">14:00</span>
                      </div>
                      <div class="schedule-event">
                        <h4>Training Session</h4>
                        <p>Junior Players</p>
                      </div>
                    </div>
                    <div class="schedule-item">
                      <div class="schedule-time">
                        <span class="date">Tomorrow</span>
                        <span class="time">10:00</span>
                      </div>
                      <div class="schedule-event">
                        <h4>Match vs Tennis Club B</h4>
                        <p>League Championship</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .club-manager-layout {
      display: flex;
      height: 100vh;
      background-color: #f5f5f5;
    }

    .sidebar {
      width: 260px;
      background: linear-gradient(180deg, #4CAF50 0%, #388E3C 100%);
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

    .sidebar-menu a:hover,
    .sidebar-menu a.active {
      background: rgba(255,255,255,0.15);
      color: white;
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
    }

    .header-left h1 {
      font-size: 20px;
      color: #333;
      font-weight: 600;
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
      background: #4CAF50;
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

    .dashboard-content {
      max-width: 1200px;
      margin: 0 auto;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      margin-bottom: 32px;
    }

    .stat-card {
      background: white;
      padding: 24px;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      transition: transform 0.3s ease;
    }

    .stat-card:hover {
      transform: translateY(-2px);
    }

    .stat-icon {
      font-size: 40px;
      margin-right: 16px;
      width: 60px;
      height: 60px;
      background: linear-gradient(135deg, #4CAF50, #66BB6A);
      border-radius: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .stat-content h3 {
      font-size: 32px;
      font-weight: 700;
      color: #333;
      margin-bottom: 4px;
    }

    .stat-content p {
      color: #666;
      font-size: 14px;
      font-weight: 500;
    }

    .content-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 24px;
    }

    .card {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    .card-header {
      padding: 20px 24px;
      border-bottom: 1px solid #f0f0f0;
    }

    .card-header h2 {
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }

    .card-content {
      padding: 24px;
    }

    .match-list, .schedule-list {
      space: 16px 0;
    }

    .match-item, .schedule-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 0;
      border-bottom: 1px solid #f0f0f0;
    }

    .match-item:last-child, .schedule-item:last-child {
      border-bottom: none;
    }

    .match-info h4, .schedule-event h4 {
      font-weight: 600;
      color: #333;
      margin-bottom: 4px;
    }

    .match-info p, .schedule-event p {
      color: #666;
      font-size: 13px;
    }

    .match-result .score {
      font-weight: 600;
      color: #4CAF50;
    }

    .schedule-time {
      text-align: right;
      min-width: 80px;
    }

    .schedule-time .date {
      display: block;
      font-weight: 600;
      color: #333;
      font-size: 14px;
    }

    .schedule-time .time {
      display: block;
      color: #666;
      font-size: 13px;
    }

    @media (max-width: 768px) {
      .club-manager-layout {
        flex-direction: column;
      }
      
      .sidebar {
        width: 100%;
        height: auto;
      }
      
      .stats-grid {
        grid-template-columns: 1fr;
      }
      
      .content-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ClubManagerDashboardComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}